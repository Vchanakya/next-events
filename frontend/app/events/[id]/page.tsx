"use client";

import {
  useGetEventByIdQuery,
  useAddAttendeeMutation,
  useRemoveAttendeeMutation,
} from "../../../graphql/generated";
import {
  Title,
  Text,
  Card,
  Stack,
  TextInput,
  Button,
  Group,
} from "@mantine/core";
import { useParams } from "next/navigation";
import { Formik, Form } from "formik";
import { object, string, InferType } from "yup";

const AttendeeSchema = object({
  name: string().required(),
  email: string().email().required(),
  rsvp: string().required(),
});

type AttendeeFormValues = InferType<typeof AttendeeSchema>;

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data, refetch } = useGetEventByIdQuery({
    variables: { id },
  });

  const [addAttendee] = useAddAttendeeMutation();
  const [removeAttendee] = useRemoveAttendeeMutation();

  if (!data?.event) {
    return <Text>Loading...</Text>;
  }

  const event = data.event;

  return (
    <Stack>
      <Title order={2}>{event.title}</Title>
      <Text>Date: {new Date(event.date).toLocaleDateString()}</Text>

      <Title order={3}>Attendees</Title>
      <Stack>
        {event.attendees.map((attendee) => (
          <Card key={attendee.id} withBorder>
            <Group justify="space-between">
              <div>
                <Text fw={500}>{attendee.name}</Text>
                <Text size="sm">{attendee.email || "No Email"}</Text>
                <Text size="sm">RSVP: {attendee.rsvp}</Text>
              </div>
              <Button
                color="red"
                size="xs"
                onClick={async () => {
                  await removeAttendee({
                    variables: { eventId: event.id, attendeeId: attendee.id },
                  });
                  await refetch();
                }}
              >
                Remove
              </Button>
            </Group>
          </Card>
        ))}
      </Stack>

      <Title order={3} mt="lg">
        Add Attendee
      </Title>
      <Formik<AttendeeFormValues>
        initialValues={{ name: "", email: "", rsvp: "Yes" }}
        validationSchema={AttendeeSchema}
        onSubmit={async (values, { resetForm }) => {
          await addAttendee({
            variables: {
              eventId: event.id,
              name: values.name,
              email: values.email,
              rsvp: values.rsvp,
            },
          });
          await refetch();
          resetForm();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
        }) => (
          <Form>
            <Stack>
              <TextInput
                name="name"
                label="Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && errors.name}
              />
              <TextInput
                name="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email}
              />
              <TextInput
                name="rsvp"
                label="RSVP Status"
                value={values.rsvp}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.rsvp && errors.rsvp}
              />
              <Button type="submit" loading={isSubmitting}>
                Add Attendee
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  );
}
