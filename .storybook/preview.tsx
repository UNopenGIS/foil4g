import React from "react";
import type { Preview } from "@storybook/react-vite";
import { themes } from "storybook/theming";

const preview: Preview = {
  parameters: {
    docs: { theme: themes.dark },
    options: {
      bottomPanelHeight: 0,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100vw", height: "100vh" }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
