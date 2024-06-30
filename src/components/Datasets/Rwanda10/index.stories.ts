import { Meta, StoryObj } from "@storybook/react";
import { Rwanda10Map } from ".";

const meta = {
  component: Rwanda10Map,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Rwanda10Map>;

export default meta;
type Story = StoryObj<typeof Rwanda10Map>;

export const Preview: Story = {};
