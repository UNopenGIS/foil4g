import { Meta, StoryObj } from "@storybook/react";
import { VientianeLanduseWithOpenCellIdAndOverture } from ".";
import { mapStyleOptions } from "../../mapStyleOptions";

const meta = {
  component: VientianeLanduseWithOpenCellIdAndOverture,
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
} satisfies Meta<typeof VientianeLanduseWithOpenCellIdAndOverture>;

export default meta;
type Story = StoryObj<typeof VientianeLanduseWithOpenCellIdAndOverture>;

export const Preview: Story = {};
