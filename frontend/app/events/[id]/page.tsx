"use client";

import { useQuery, useMutation } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Container,
  Title,
  Card,
  Text,
  Group,
  Stack,
  Button,
  TextInput,
  ActionIcon,
  Table,
  Badge,
  Loader,
  Center,
  Alert,
  Box,
  Breadcrumbs,
  Anchor,
  Modal,
  Divider,
  Tooltip,
  LoadingOverlay,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCalendar,
  IconUsers,
  IconArrowLeft,
  IconUserPlus,
  IconTrash,
  IconAlertCircle,
  IconMail,
  IconUser,
} from "@tabler/icons-react";
import { GET_EVENT } from "../../../graphql/getEventById.query";
import { ADD_ATTENDEE } from "../../../graphql/addAttendee.mutation";
import { REMOVE_ATTENDEE } from "../../../graphql/removeAttendee.mutation";
import {
  GetEventData,
  AddAttendeeData,
  RemoveAttendeeData,
} from "../../../types/types";

const ATTENDEES_PER_PAGE = 10;

interface AttendeeFormValues {
  name: string;
  email: string;
}

const attendeeSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .max(100, "Email must be less than 100 characters")
    .notRequired(),
});

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [opened, { open, close }] = useDisclosure(false);

  const { loading, error, data, fetchMore } = useQuery<GetEventData>(
    GET_EVENT,
    {
      variables: {
        id,
        attendeesFirst: ATTENDEES_PER_PAGE,
      },
    }
  );

  const [addAttendee, { loading: addingAttendee }] =
    useMutation<AddAttendeeData>(ADD_ATTENDEE, {
      refetchQueries: [
        {
          query: GET_EVENT,
          variables: { id, attendeesFirst: ATTENDEES_PER_PAGE },
        },
      ],
      onCompleted: () => {
        close();
      },
    });

  const [removeAttendee, { loading: removingAttendee }] =
    useMutation<RemoveAttendeeData>(REMOVE_ATTENDEE, {
      refetchQueries: [
        {
          query: GET_EVENT,
          variables: { id, attendeesFirst: ATTENDEES_PER_PAGE },
        },
      ],
    });

  const handleAddAttendee = async (values: AttendeeFormValues) => {
    await addAttendee({
      variables: {
        eventId: id,
        name: values.name.trim(),
        email: values.email.trim() || undefined,
      },
    });
  };

  const handleRemoveAttendee = async (
    attendeeId: string,
    attendeeName: string
  ) => {
    if (
      confirm(
        `Are you sure you want to remove ${attendeeName} from this event?`
      )
    ) {
      await removeAttendee({
        variables: {
          eventId: id,
          attendeeId,
        },
      });
    }
  };

  const handleLoadMoreAttendees = () => {
    if (data?.event?.attendees.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          attendeesAfter: data.event.attendees.pageInfo.endCursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult?.event) return prev;
          return {
            event: {
              ...fetchMoreResult.event,
              attendees: {
                ...fetchMoreResult.event.attendees,
                edges: [
                  ...prev.event!.attendees.edges,
                  ...fetchMoreResult.event.attendees.edges,
                ],
              },
            },
          };
        },
      });
    }
  };

  if (loading && !data) {
    return (
      <Center h="50vh">
        <Loader size="lg" />
      </Center>
    );
  }

  if (error || !data?.event) {
    return (
      <Container size="lg" mt="xl">
        <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red">
          {error?.message || "Event not found"}
        </Alert>
        <Button
          mt="md"
          variant="subtle"
          leftSection={<IconArrowLeft size="1rem" />}
          onClick={() => router.push("/events")}
        >
          Back to Events
        </Button>
      </Container>
    );
  }

  const { event } = data;
  const attendees = event.attendees.edges.map((edge) => edge.node);

  return (
    <Container size="lg" py="xl">
      <Breadcrumbs mb="xl">
        <Anchor component={Link} href="/events">
          Events
        </Anchor>
        <Text>{event.title}</Text>
      </Breadcrumbs>

      <Card radius="md" withBorder shadow="sm" mb="xl">
        <Group justify="space-between" mb="md">
          <Title order={2}>{event.title}</Title>
          <Button
            variant="subtle"
            leftSection={<IconArrowLeft size="1rem" />}
            onClick={() => router.push("/events")}
          >
            Back
          </Button>
        </Group>

        <Stack gap="sm">
          <Group gap="xs">
            <IconCalendar size="1.2rem" color="var(--mantine-color-gray-6)" />
            <Text>
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </Group>
          <Group gap="xs">
            <IconUsers size="1.2rem" color="var(--mantine-color-gray-6)" />
            <Badge variant="light" size="lg">
              {event.attendeeCount}{" "}
              {event.attendeeCount === 1 ? "attendee" : "attendees"}
            </Badge>
          </Group>
        </Stack>
      </Card>

      <Card radius="md" withBorder shadow="sm">
        <Group justify="space-between" mb="lg">
          <Title order={3}>Attendees</Title>
          <Button leftSection={<IconUserPlus size="1.2rem" />} onClick={open}>
            Add Attendee
          </Button>
        </Group>

        {attendees.length === 0 ? (
          <Text ta="center" c="dimmed" py="xl">
            No attendees yet. Add the first attendee!
          </Text>
        ) : (
          <Box pos="relative">
            <LoadingOverlay visible={removingAttendee} />
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Email</Table.Th>
                  <Table.Th style={{ width: 100 }}>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {attendees.map((attendee) => (
                  <Table.Tr key={attendee.id}>
                    <Table.Td>
                      <Group gap="xs">
                        <IconUser
                          size="1rem"
                          color="var(--mantine-color-gray-6)"
                        />
                        <Text fw={500}>{attendee.name}</Text>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      {attendee.email ? (
                        <Group gap="xs">
                          <IconMail
                            size="1rem"
                            color="var(--mantine-color-gray-6)"
                          />
                          <Text>{attendee.email}</Text>
                        </Group>
                      ) : (
                        <Text c="dimmed" fs="italic">
                          No email provided
                        </Text>
                      )}
                    </Table.Td>
                    <Table.Td>
                      <Tooltip label="Remove attendee">
                        <ActionIcon
                          color="red"
                          variant="subtle"
                          onClick={() =>
                            handleRemoveAttendee(attendee.id, attendee.name)
                          }
                          disabled={removingAttendee}
                        >
                          <IconTrash size="1rem" />
                        </ActionIcon>
                      </Tooltip>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>

            {event.attendees.pageInfo.hasNextPage && (
              <Center mt="lg">
                <Button
                  onClick={handleLoadMoreAttendees}
                  loading={loading}
                  variant="default"
                >
                  Load More Attendees
                </Button>
              </Center>
            )}
          </Box>
        )}
      </Card>

      <Modal
        opened={opened}
        onClose={close}
        title="Add Attendee"
        centered
        size="md"
      >
        <Formik
          initialValues={{ name: "", email: "" }}
          validationSchema={attendeeSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await handleAddAttendee(values);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            setFieldValue,
            setFieldTouched,
          }) => (
            <Form>
              <Stack gap="md">
                <TextInput
                  label="Name"
                  placeholder="Enter attendee name"
                  value={values.name}
                  onChange={(e) => setFieldValue("name", e.currentTarget.value)}
                  onBlur={() => setFieldTouched("name", true)}
                  error={touched.name && errors.name}
                  required
                  leftSection={<IconUser size="1rem" />}
                />
                <TextInput
                  label="Email"
                  placeholder="Enter email (optional)"
                  type="email"
                  value={values.email}
                  onChange={(e) =>
                    setFieldValue("email", e.currentTarget.value)
                  }
                  onBlur={() => setFieldTouched("email", true)}
                  error={touched.email && errors.email}
                  leftSection={<IconMail size="1rem" />}
                />
                <Divider />
                <Group justify="flex-end">
                  <Button
                    variant="subtle"
                    onClick={close}
                    disabled={isSubmitting || addingAttendee}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    loading={isSubmitting || addingAttendee}
                    disabled={!values.name.trim()}
                  >
                    Add Attendee
                  </Button>
                </Group>
              </Stack>
            </Form>
          )}
        </Formik>
      </Modal>
    </Container>
  );
}
