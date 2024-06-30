import { Meta, StoryObj } from "@storybook/react";
import { OpenCellIdWithRwanda10AndOverture } from ".";
import { mapStyleOptions } from "../../mapStyleOptions";

const meta = {
  component: OpenCellIdWithRwanda10AndOverture,
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
} satisfies Meta<typeof OpenCellIdWithRwanda10AndOverture>;

export default meta;
type Story = StoryObj<typeof OpenCellIdWithRwanda10AndOverture>;

export const Preview: Story = {};
