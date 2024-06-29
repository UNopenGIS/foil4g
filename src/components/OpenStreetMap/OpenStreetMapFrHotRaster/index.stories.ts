import { Meta, StoryObj } from "@storybook/react";
import { OpenStreetMapFrHotRaster } from ".";

const meta = {
  component: OpenStreetMapFrHotRaster,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof OpenStreetMapFrHotRaster>;

export default meta;
type Story = StoryObj<typeof OpenStreetMapFrHotRaster>;

export const Preview: Story = {};
