import { Meta, StoryObj } from "@storybook/react";
import { VientianeLanduseMap } from ".";

const meta = {
  component: VientianeLanduseMap,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof VientianeLanduseMap>;

export default meta;
type Story = StoryObj<typeof VientianeLanduseMap>;

export const Preview: Story = {};
