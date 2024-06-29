import { Meta, StoryObj } from "@storybook/react";
import { UNClearMapRaster } from "./";

const meta = {
  component: UNClearMapRaster,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof UNClearMapRaster>;

export default meta;
type Story = StoryObj<typeof UNClearMapRaster>;

export const Preview: Story = {};
