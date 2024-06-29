import { Meta, StoryObj } from "@storybook/react";
import { OpenCellIdWithStyle } from ".";
import { mapStyleOptions } from "../../mapStyleOptions";

const meta = {
  component: OpenCellIdWithStyle,
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
} satisfies Meta<typeof OpenCellIdWithStyle>;

export default meta;
type Story = StoryObj<typeof OpenCellIdWithStyle>;

export const Preview: Story = {};
