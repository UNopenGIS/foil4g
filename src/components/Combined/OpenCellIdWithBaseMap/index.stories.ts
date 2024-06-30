import { Meta, StoryObj } from "@storybook/react";
import { OpenCellIdWithBaseMap } from ".";
import { mapStyleOptions } from "../../mapStyleOptions";

const meta = {
  component: OpenCellIdWithBaseMap,
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
} satisfies Meta<typeof OpenCellIdWithBaseMap>;

export default meta;
type Story = StoryObj<typeof OpenCellIdWithBaseMap>;

export const Preview: Story = {};
