import { Meta, StoryObj } from "@storybook/react";
import { DEM1AMap } from ".";

const meta = {
  component: DEM1AMap,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DEM1AMap>;

export default meta;
type Story = StoryObj<typeof DEM1AMap>;

export const Preview: Story = {};
