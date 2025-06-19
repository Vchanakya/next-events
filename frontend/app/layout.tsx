import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import React from "react";
import {
  MantineProvider,
  ColorSchemeScript,
  mantineHtmlProps,
} from "@mantine/core";
import { theme } from "../theme";
import ApolloWrapper from "../components/ApolloWrapper";
import { AppShellComponent } from "../components/AppShellComponent";

export const metadata = {
  title: "Event Manager",
  description: "Manage your events and attendees",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <ApolloWrapper>
          <MantineProvider theme={theme}>
            <AppShellComponent>{children}</AppShellComponent>
          </MantineProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
