import { Meta, StoryObj } from "@storybook/react";
import { OpenStreetMapOrgRaster } from ".";

const meta = {
  component: OpenStreetMapOrgRaster,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof OpenStreetMapOrgRaster>;

export default meta;
type Story = StoryObj<typeof OpenStreetMapOrgRaster>;

export const Preview: Story = {};
