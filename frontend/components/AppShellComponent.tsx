"use client";

import { AppShell, Group, Title, Button, Container } from "@mantine/core";
import { IconCalendarEvent } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppShellComponent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Container size="lg" h="100%">
          <Group h="100%" justify="space-between">
            <Button
              component={Link}
              href="/"
              size="xl"
              variant="subtle"
              leftSection={<IconCalendarEvent size={28} />}
            >
              Event Manager
            </Button>
            <Group>
              <Button
                component={Link}
                href="/events"
                variant={pathname === "/events" ? "filled" : "subtle"}
              >
                Events
              </Button>
              <Button
                component={Link}
                href="/events/new"
                variant={pathname === "/events/new" ? "filled" : "subtle"}
              >
                Create Event
              </Button>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
