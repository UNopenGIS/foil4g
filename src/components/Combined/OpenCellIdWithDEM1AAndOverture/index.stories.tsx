import { Meta, StoryObj } from "@storybook/react";
import { OpenCellIdWithDEM1AAndOverture } from ".";
import { mapStyleOptions } from "../../mapStyleOptions";

const meta = {
  component: OpenCellIdWithDEM1AAndOverture,
  argTypes: {
    mapStyle: {
      options: mapStyleOptions,
      control: { type: "select" },
    },
  },
  args: {
    mapStyle: "stylejson/tile.openstreetmap.jp/fiord-color-gl-style/style.json",
  },
  parameters: {
    layout: "fullscreen",
    options: {
      bottomPanelHeight: 300,
    },
  },
} satisfies Meta<typeof OpenCellIdWithDEM1AAndOverture>;

export default meta;
type Story = StoryObj<typeof OpenCellIdWithDEM1AAndOverture>;

export const Preview: Story = {};
