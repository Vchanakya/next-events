"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import {
  Container,
  Title,
  Card,
  TextInput,
  Button,
  Group,
  Stack,
  Alert,
  Breadcrumbs,
  Anchor,
  Text,
  Box,
  Paper,
  Divider,
  LoadingOverlay,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import {
  IconCalendarEvent,
  IconArrowLeft,
  IconCheck,
  IconAlertCircle,
  IconCalendar,
  IconClock,
} from "@tabler/icons-react";
import Link from "next/link";
import { GET_EVENTS } from "../../../graphql/getEvents.query";
import { CREATE_EVENT } from "../../../graphql/createEvent.mutation";
import { CreateEventData } from "../../../types/types";
import { showNotification } from "@mantine/notifications";

interface EventFormValues {
  title: string;
  date: Date | null;
}

const eventSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters")
    .required("Title is required"),
  date: Yup.date()
    .min(new Date(), "Event date must be in the future")
    .required("Date is required")
    .typeError("Please select a valid date"),
});

export default function CreateEventPage() {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [createEvent, { loading, error }] = useMutation<CreateEventData>(
    CREATE_EVENT,
    {
      refetchQueries: [
        {
          query: GET_EVENTS,
          variables: {
            first: 5,
            orderBy: { field: "CREATED_AT", direction: "DESC" },
          },
        },
      ],
      onCompleted: (data) => {
        setSuccessMessage(
          `Event "${data.createEvent.title}" created successfully!`
        );
        setTimeout(() => {
          router.push(`/events/${data.createEvent.id}`);
        }, 1500);
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

  const initialValues: EventFormValues = {
    title: "",
    date: new Date(),
  };

  const handleSubmit = async (
    values: EventFormValues,
    { setSubmitting }: FormikHelpers<EventFormValues>
  ) => {
    if (!values.date) return;

    try {
      await createEvent({
        variables: {
          title: values.title.trim(),
          date: values.date.toISOString(),
        },
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container size="sm" py="xl">
      <Breadcrumbs mb="xl">
        <Anchor component={Link} href="/events">
          Events
        </Anchor>
        <Text>Create Event</Text>
      </Breadcrumbs>

      <Paper radius="md" withBorder shadow="sm" p="xl">
        <Group mb="xl">
          <IconCalendarEvent size={32} />
          <Title order={2}>Create New Event</Title>
        </Group>

        <Divider mb="xl" />

        {successMessage && (
          <Alert
            icon={<IconCheck size="1rem" />}
            title="Success"
            color="green"
            mb="lg"
            withCloseButton
            onClose={() => setSuccessMessage(null)}
          >
            {successMessage}
          </Alert>
        )}

        {error && (
          <Alert
            icon={<IconAlertCircle size="1rem" />}
            title="Error"
            color="red"
            mb="lg"
          >
            {error.message}
          </Alert>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={eventSchema}
          onSubmit={handleSubmit}
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
              <Box pos="relative">
                <LoadingOverlay visible={loading || isSubmitting} />

                <Stack gap="lg">
                  <TextInput
                    label="Event Title"
                    placeholder="Enter event title"
                    name="title"
                    value={values.title}
                    onChange={(e) =>
                      setFieldValue("title", e.currentTarget.value)
                    }
                    onBlur={() => setFieldTouched("title", true)}
                    error={touched.title && errors.title}
                    required
                    size="md"
                    leftSection={<IconCalendarEvent size="1rem" />}
                  />

                  <DateTimePicker
                    label="Event Date & Time"
                    placeholder="Select date and time"
                    name="date"
                    value={values.date}
                    onChange={(value) =>
                      setFieldValue("date", new Date(value || ""))
                    }
                    onBlur={() => setFieldTouched("date", true)}
                    error={touched.date && errors.date}
                    minDate={new Date()}
                    required
                    size="md"
                    leftSection={<IconCalendar size="1rem" />}
                    rightSection={<IconClock size="1rem" />}
                    clearable
                    popoverProps={{
                      withinPortal: true,
                    }}
                  />

                  <Card withBorder radius="md" p="md" bg="gray.0">
                    <Stack gap="xs">
                      <Text size="sm" fw={600}>
                        Event Preview
                      </Text>
                      <Divider />
                      <Group gap="xs">
                        <Text size="sm" c="dimmed">
                          Title:
                        </Text>
                        <Text size="sm" fw={500}>
                          {values.title || "No title yet"}
                        </Text>
                      </Group>
                      <Group gap="xs">
                        <Text size="sm" c="dimmed">
                          Date:{" "}
                          {values.date
                            ? values.date.toDateString()
                            : "No date selected"}
                        </Text>
                        <Text size="sm" fw={500}>
                          {values.date
                            ? values.date.toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "No date selected"}
                        </Text>
                      </Group>
                    </Stack>
                  </Card>

                  <Divider />

                  <Group justify="space-between">
                    <Button
                      variant="subtle"
                      leftSection={<IconArrowLeft size="1rem" />}
                      onClick={() => router.push("/events")}
                      disabled={isSubmitting || loading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      loading={isSubmitting || loading}
                      disabled={!values.title || !values.date}
                      leftSection={<IconCheck size="1rem" />}
                      size="md"
                    >
                      Create Event
                    </Button>
                  </Group>
                </Stack>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>

      <Text ta="center" size="sm" c="dimmed" mt="xl">
        After creating the event, you'll be able to add attendees.
      </Text>
    </Container>
  );
}
