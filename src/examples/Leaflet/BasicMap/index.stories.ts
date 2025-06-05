import { Meta, StoryObj } from "@storybook/react";
import { BasicLeafletMap } from ".";

const meta = {
  component: BasicLeafletMap,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof BasicLeafletMap>;

export default meta;

type Story = StoryObj<typeof BasicLeafletMap>;

export const Preview: Story = {};
