import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import React, { useState } from "react";
import {
  MantineProvider,
  ColorSchemeScript,
  mantineHtmlProps,
} from "@mantine/core";
import { theme } from "../theme";
import ApolloWrapper from "../components/ApolloWrapper";

export const metadata = {
  title: "NextJS Event Manager",
  description: "NextJS Event Manager",
};

export default function RootLayout({ children }: { children: any }) {
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
          <MantineProvider theme={theme}>{children}</MantineProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
