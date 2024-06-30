import { Meta, StoryObj } from "@storybook/react";
import { OvertureMaps } from ".";

const meta = {
  component: OvertureMaps,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof OvertureMaps>;

export default meta;
type Story = StoryObj<typeof OvertureMaps>;

export const Preview: Story = {};
