"use client";

import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Card,
  SimpleGrid,
  Stack,
  Center,
  Box,
  ThemeIcon,
  Badge,
  BackgroundImage,
  Overlay,
} from "@mantine/core";
import {
  IconCalendarEvent,
  IconUsers,
  IconPlus,
  IconListCheck,
  IconSparkles,
  IconRocket,
  IconArrowRight,
} from "@tabler/icons-react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "../graphql/getEvents.query";
import { GetEventsData } from "../types/types";

const features = [
  {
    icon: IconCalendarEvent,
    title: "Event Management",
    description:
      "Create and manage events with ease. Set dates, track details, and keep everything organized.",
    color: "blue",
  },
  {
    icon: IconUsers,
    title: "Attendee Tracking",
    description:
      "Keep track of who's coming to your events. Add, remove, and manage attendees effortlessly.",
    color: "teal",
  },
  {
    icon: IconListCheck,
    title: "Real-time Updates",
    description:
      "All changes are instantly reflected across the app with our GraphQL-powered backend.",
    color: "violet",
  },
  {
    icon: IconSparkles,
    title: "Modern Interface",
    description:
      "Clean, intuitive design built with Mantine UI for the best user experience.",
    color: "pink",
  },
];

export default function HomePage() {
  const { data } = useQuery<GetEventsData>(GET_EVENTS, {
    variables: { first: 3, orderBy: { field: "DATE", direction: "ASC" } },
  });

  const upcomingEvents = data?.events.edges.map((edge) => edge.node) || [];
  const totalEvents = data?.events.totalCount || 0;

  return (
    <>
      {/* Hero Section */}
      <Box pos="relative" h={400}>
        <BackgroundImage
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&h=400&fit=crop"
          h={400}
        >
          <Overlay
            gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 100%)"
            zIndex={1}
          />
          <Center h="100%" pos="relative" style={{ zIndex: 2 }}>
            <Container size="lg">
              <Stack align="center" ta="center">
                <Badge size="lg" variant="filled" radius="md">
                  Event Management Made Simple
                </Badge>
                <Title c="white" size={50} fw={900}>
                  Welcome to Event Manager
                </Title>
                <Text c="white" size="xl" maw={600}>
                  The modern way to organize events and manage attendees.
                  Simple, fast, and powerful.
                </Text>
                <Group mt="xl">
                  <Button
                    component={Link}
                    href="/events"
                    size="lg"
                    radius="md"
                    leftSection={<IconListCheck size="1.2rem" />}
                  >
                    View All Events
                  </Button>
                  <Button
                    component={Link}
                    href="/events/new"
                    size="lg"
                    radius="md"
                    variant="white"
                    color="dark"
                    leftSection={<IconPlus size="1.2rem" />}
                  >
                    Create Event
                  </Button>
                </Group>
              </Stack>
            </Container>
          </Center>
        </BackgroundImage>
      </Box>

      <Container size="lg" py="xl">
        {/* Stats Section */}
        <SimpleGrid cols={{ base: 1, sm: 3 }} mb={60}>
          <Card radius="md" withBorder p="xl" shadow="sm">
            <Group justify="space-between">
              <div>
                <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                  Total Events
                </Text>
                <Text size="xl" fw={900}>
                  {totalEvents}
                </Text>
              </div>
              <ThemeIcon size={60} radius="md" variant="light" color="blue">
                <IconCalendarEvent size={30} />
              </ThemeIcon>
            </Group>
          </Card>

          <Card radius="md" withBorder p="xl" shadow="sm">
            <Group justify="space-between">
              <div>
                <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                  Upcoming
                </Text>
                <Text size="xl" fw={900}>
                  {upcomingEvents.length}
                </Text>
              </div>
              <ThemeIcon size={60} radius="md" variant="light" color="teal">
                <IconRocket size={30} />
              </ThemeIcon>
            </Group>
          </Card>

          <Card radius="md" withBorder p="xl" shadow="sm">
            <Group justify="space-between">
              <div>
                <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                  Active Now
                </Text>
                <Text size="xl" fw={900} c="green">
                  Live
                </Text>
              </div>
              <ThemeIcon size={60} radius="md" variant="light" color="green">
                <IconSparkles size={30} />
              </ThemeIcon>
            </Group>
          </Card>
        </SimpleGrid>

        {/* Features Section */}
        <Stack gap="xl" mb={60}>
          <Box ta="center">
            <Title order={2} size={36} mb="md">
              Everything you need to manage events
            </Title>
            <Text c="dimmed" size="lg" maw={600} mx="auto">
              Our platform provides all the tools you need to create, manage,
              and track your events successfully.
            </Text>
          </Box>

          <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
            {features.map((feature) => (
              <Card
                key={feature.title}
                radius="md"
                withBorder
                p="lg"
                shadow="sm"
              >
                <ThemeIcon
                  size={50}
                  radius="md"
                  variant="light"
                  color={feature.color}
                  mb="md"
                >
                  <feature.icon size={26} />
                </ThemeIcon>
                <Text size="lg" fw={600} mb="xs">
                  {feature.title}
                </Text>
                <Text size="sm" c="dimmed">
                  {feature.description}
                </Text>
              </Card>
            ))}
          </SimpleGrid>
        </Stack>

        {/* Upcoming Events Section */}
        {upcomingEvents.length > 0 && (
          <Stack gap="xl">
            <Group justify="space-between" align="end">
              <Box>
                <Title order={2} size={36}>
                  Upcoming Events
                </Title>
                <Text c="dimmed" mt="xs">
                  Don't miss out on these upcoming events
                </Text>
              </Box>
              <Button
                component={Link}
                href="/events"
                variant="subtle"
                rightSection={<IconArrowRight size="1rem" />}
              >
                View All Events
              </Button>
            </Group>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
              {upcomingEvents.map((event) => (
                <Card
                  key={event.id}
                  component={Link}
                  href={`/events/${event.id}`}
                  radius="md"
                  withBorder
                  shadow="sm"
                  style={{
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  styles={{
                    root: {
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "var(--mantine-shadow-lg)",
                      },
                    },
                  }}
                >
                  <Stack gap="xs">
                    <Text fw={600} size="lg" lineClamp={1}>
                      {event.title}
                    </Text>
                    <Group gap="xs">
                      <IconCalendarEvent
                        size="1rem"
                        color="var(--mantine-color-gray-6)"
                      />
                      <Text size="sm" c="dimmed">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </Text>
                    </Group>
                    <Group gap="xs">
                      <IconUsers
                        size="1rem"
                        color="var(--mantine-color-gray-6)"
                      />
                      <Text size="sm" c="dimmed">
                        {event.attendeeCount}{" "}
                        {event.attendeeCount === 1 ? "attendee" : "attendees"}
                      </Text>
                    </Group>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          </Stack>
        )}

        {/* CTA Section */}
        <Center mt={80}>
          <Card radius="md" p="xl" w="100%" maw={600} withBorder shadow="sm">
            <Stack align="center" ta="center">
              <ThemeIcon
                size={60}
                radius="md"
                variant="gradient"
                gradient={{ from: "blue", to: "cyan" }}
              >
                <IconRocket size={30} />
              </ThemeIcon>
              <Title order={3} size={28}>
                Ready to get started?
              </Title>
              <Text c="dimmed" size="lg">
                Create your first event and start managing attendees today.
              </Text>
              <Button
                component={Link}
                href="/events/new"
                size="lg"
                radius="md"
                mt="md"
                leftSection={<IconPlus size="1.2rem" />}
                variant="gradient"
                gradient={{ from: "blue", to: "cyan" }}
              >
                Create Your First Event
              </Button>
            </Stack>
          </Card>
        </Center>
      </Container>
    </>
  );
}
