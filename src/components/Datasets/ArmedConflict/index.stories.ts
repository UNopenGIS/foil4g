import { Meta, StoryObj } from "@storybook/react";
import { ArmedConflictMap } from ".";

const meta = {
  component: ArmedConflictMap,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ArmedConflictMap>;

export default meta;
type Story = StoryObj<typeof ArmedConflictMap>;

export const Preview: Story = {};
