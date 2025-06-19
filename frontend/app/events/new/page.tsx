"use client";

import { useCreateEventMutation } from "../../../graphql/generated";
import { Button, Card, Stack, TextInput, Text, Title } from "@mantine/core";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { DateInput } from "@mantine/dates";
import { object, string, number, date, InferType } from "yup";
import { useState } from "react";

let userSchema = object({
  name: string().required(),
  age: number().required().positive().integer(),
  email: string().email(),
  website: string().url().nullable(),
  createdOn: date().default(() => new Date()),
});

type User = InferType<typeof userSchema>;

const EventSchema = object({
  title: string().required(),
  date: string().required(),
});

type EventFormValues = InferType<typeof EventSchema>;

export default function CreateEventPage() {
  const [createEvent] = useCreateEventMutation();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const initialValues: EventFormValues = {
    title: "",
    date: "",
  };

  return (
    <Card withBorder maw={500} mx="auto" mt="lg">
      <Title order={2} mb="md">
        Create New Event
      </Title>

      <Formik<EventFormValues>
        initialValues={initialValues}
        validationSchema={EventSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await createEvent({
              variables: {
                title: values.title,
                date: new Date(values.date).toISOString(),
              },
            });
            router.push("/events");
          } catch (err: Error | unknown) {
            setError(err instanceof Error ? err.message : "Unknown error");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
          setFieldValue,
        }) => (
          <Form>
            <Stack>
              <TextInput
                name="title"
                label="Event Title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.title && errors.title}
              />
              <DateInput
                name="date"
                label="Event Date"
                value={values.date}
                onChange={(val) => setFieldValue("date", val)}
                onBlur={handleBlur}
                error={touched.date && errors.date}
              />
              <Button type="submit" loading={isSubmitting}>
                Create Event
              </Button>
              {error && <Text c="red">{error}</Text>}
            </Stack>
          </Form>
        )}
      </Formik>
    </Card>
  );
}
