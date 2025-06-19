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
  Select,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import {
  IconCalendar,
  IconUsers,
  IconArrowLeft,
  IconUserPlus,
  IconTrash,
  IconAlertCircle,
  IconMail,
  IconUser,
  IconCheck,
  IconX,
  IconQuestionMark,
} from "@tabler/icons-react";
import { GET_EVENT } from "../../../graphql/getEventById.query";
import { ADD_ATTENDEE } from "../../../graphql/addAttendee.mutation";
import { REMOVE_ATTENDEE } from "../../../graphql/removeAttendee.mutation";
import { GetEventData } from "../../../types/types";

const ATTENDEES_PER_PAGE = 20;

interface AttendeeFormValues {
  name: string;
  email: string;
  rsvp: string;
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
  rsvp: Yup.string()
    .oneOf(["ATTENDING", "NOT_ATTENDING", "MAYBE"], "Invalid RSVP status")
    .required("RSVP status is required"),
});

const getRSVPColor = (rsvp: string) => {
  switch (rsvp) {
    case "ATTENDING":
      return "green";
    case "NOT_ATTENDING":
      return "red";
    case "MAYBE":
      return "yellow";
    default:
      return "gray";
  }
};

const getRSVPIcon = (rsvp: string) => {
  switch (rsvp) {
    case "ATTENDING":
      return <IconCheck size={14} />;
    case "NOT_ATTENDING":
      return <IconX size={14} />;
    case "MAYBE":
      return <IconQuestionMark size={14} />;
    default:
      return null;
  }
};

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [opened, { open, close }] = useDisclosure(false);

  const { loading, error, data, refetch } = useQuery<GetEventData>(GET_EVENT, {
    variables: {
      id,
      attendeesFirst: ATTENDEES_PER_PAGE,
    },
    errorPolicy: "all",
  });

  const [addAttendee, { loading: addingAttendee }] = useMutation(ADD_ATTENDEE, {
    onCompleted: () => {
      close();
      refetch();
      showNotification({
        title: "Success",
        message: "Attendee added successfully!",
        color: "green",
      });
    },
    onError: (error) => {
      showNotification({
        title: "Error",
        message: error.message,
        color: "red",
      });
    },
  });

  const [removeAttendee, { loading: removingAttendee }] = useMutation(
    REMOVE_ATTENDEE,
    {
      onCompleted: () => {
        refetch();
        showNotification({
          title: "Success",
          message: "Attendee removed successfully!",
          color: "green",
        });
      },
      onError: (error) => {
        showNotification({
          title: "Error",
          message: error.message,
          color: "red",
        });
      },
    }
  );

  const handleSubmit = async (values: AttendeeFormValues) => {
    try {
      await addAttendee({
        variables: {
          eventId: id,
          name: values.name.trim(),
          email: values.email.trim() || null,
          rsvp: values.rsvp,
        },
      });
    } catch (error) {
      console.error("Error adding attendee:", error);
    }
  };

  const handleRemoveAttendee = async (attendeeId: string) => {
    if (window.confirm("Are you sure you want to remove this attendee?")) {
      try {
        await removeAttendee({
          variables: {
            eventId: id,
            attendeeId,
          },
        });
      } catch (error) {
        console.error("Error removing attendee:", error);
      }
    }
  };

  if (loading) {
    return (
      <Center h={200}>
        <Loader size="lg" />
      </Center>
    );
  }

  if (error || !data?.event) {
    return (
      <Container size="lg" py="xl">
        <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red">
          {error?.message || "Event not found"}
        </Alert>
      </Container>
    );
  }

  const event = data.event;
  const attendees = event.attendees?.edges?.map((edge) => edge.node) || [];

  return (
    <Container size="lg" py="xl">
      <Breadcrumbs mb="xl">
        <Anchor component={Link} href="/events">
          Events
        </Anchor>
        <Text>{event.title}</Text>
      </Breadcrumbs>

      <Group justify="space-between" mb="xl">
        <Button
          variant="subtle"
          leftSection={<IconArrowLeft size="1rem" />}
          onClick={() => router.push("/events")}
        >
          Back to Events
        </Button>
      </Group>

      <Stack gap="xl">
        {/* Event Info */}
        <Card radius="md" withBorder shadow="sm" p="xl">
          <Group justify="space-between" mb="md">
            <Title order={1}>{event.title}</Title>
            <Badge size="lg" variant="light" color="blue">
              {attendees.length} attendee{attendees.length !== 1 ? "s" : ""}
            </Badge>
          </Group>

          <Group gap="xl">
            <Group gap="sm">
              <IconCalendar size="1.2rem" />
              <div>
                <Text fw={500}>Event Date</Text>
                <Text c="dimmed">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </div>
            </Group>
            <Group gap="sm">
              <IconUsers size="1.2rem" />
              <div>
                <Text fw={500}>Attendees</Text>
                <Text c="dimmed">{event.attendeeCount} registered</Text>
              </div>
            </Group>
          </Group>
        </Card>

        {/* Attendees Section */}
        <Card radius="md" withBorder shadow="sm" p="xl">
          <Group justify="space-between" mb="md">
            <Title order={2}>Attendees</Title>
            <Button leftSection={<IconUserPlus size="1rem" />} onClick={open}>
              Add Attendee
            </Button>
          </Group>

          {attendees.length === 0 ? (
            <Text ta="center" c="dimmed" py="xl">
              No attendees yet. Be the first to add one!
            </Text>
          ) : (
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Email</Table.Th>
                  <Table.Th>RSVP Status</Table.Th>
                  <Table.Th w={80}>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {attendees.map((attendee) => (
                  <Table.Tr key={attendee.id}>
                    <Table.Td>
                      <Group gap="sm">
                        <IconUser size="1rem" />
                        <Text fw={500}>{attendee.name}</Text>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      {attendee.email ? (
                        <Group gap="sm">
                          <IconMail size="1rem" />
                          <Text>{attendee.email}</Text>
                        </Group>
                      ) : (
                        <Text c="dimmed">No email</Text>
                      )}
                    </Table.Td>
                    <Table.Td>
                      <Badge
                        color={getRSVPColor(attendee.rsvp)}
                        variant="light"
                        leftSection={getRSVPIcon(attendee.rsvp)}
                      >
                        {attendee.rsvp.replace("_", " ")}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Tooltip label="Remove attendee">
                        <ActionIcon
                          color="red"
                          variant="light"
                          onClick={() => handleRemoveAttendee(attendee.id)}
                          loading={removingAttendee}
                        >
                          <IconTrash size="1rem" />
                        </ActionIcon>
                      </Tooltip>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          )}
        </Card>
      </Stack>

      {/* Add Attendee Modal */}
      <Modal opened={opened} onClose={close} title="Add New Attendee" size="md">
        <Formik
          initialValues={{
            name: "",
            email: "",
            rsvp: "ATTENDING",
          }}
          validationSchema={attendeeSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <Stack gap="md">
                <TextInput
                  label="Name"
                  placeholder="Enter attendee name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && errors.name}
                  required
                />

                <TextInput
                  label="Email"
                  placeholder="Enter email address (optional)"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email}
                />

                <Select
                  label="RSVP Status"
                  placeholder="Select RSVP status"
                  name="rsvp"
                  value={values.rsvp}
                  onChange={(value) =>
                    handleChange({ target: { name: "rsvp", value } })
                  }
                  data={[
                    { value: "ATTENDING", label: "Attending" },
                    { value: "NOT_ATTENDING", label: "Not Attending" },
                    { value: "MAYBE", label: "Maybe" },
                  ]}
                  error={touched.rsvp && errors.rsvp}
                  required
                />

                <Group justify="flex-end" mt="md">
                  <Button variant="subtle" onClick={close}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    loading={addingAttendee}
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
