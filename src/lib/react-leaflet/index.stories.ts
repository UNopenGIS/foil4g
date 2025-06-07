import { Meta, StoryObj } from "@storybook/react";
import { BasicReactLeafletMap } from ".";

const meta = {
  component: BasicReactLeafletMap,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof BasicReactLeafletMap>;

export default meta;

type Story = StoryObj<typeof BasicReactLeafletMap>;

export const Preview: Story = {};
