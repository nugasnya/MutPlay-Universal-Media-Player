import React from "react";
import { Stack } from "expo-router";

import { MediaProvider } from "../context/MediaContext";

export default function RootLayout() {
  return (
    <MediaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </MediaProvider>
  );
}