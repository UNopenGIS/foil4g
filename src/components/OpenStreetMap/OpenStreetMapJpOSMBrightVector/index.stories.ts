import { Meta, StoryObj } from "@storybook/react";
import { OpenStreetMapJpOSMBrightVector } from ".";

const meta = {
  component: OpenStreetMapJpOSMBrightVector,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof OpenStreetMapJpOSMBrightVector>;

export default meta;
type Story = StoryObj<typeof OpenStreetMapJpOSMBrightVector>;

export const Preview: Story = {};
