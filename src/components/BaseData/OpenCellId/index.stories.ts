import { Meta, StoryObj } from "@storybook/react";
import { OpenCellId } from ".";

const meta = {
  component: OpenCellId,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof OpenCellId>;

export default meta;
type Story = StoryObj<typeof OpenCellId>;

export const Preview: Story = {};
