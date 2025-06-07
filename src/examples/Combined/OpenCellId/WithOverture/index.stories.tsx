import { Meta, StoryObj } from "@storybook/react-vite";
import { OpenCellIdWithOverture } from ".";
import { mapStyleOptions } from "../../../../components/mapStyleOptions";

const meta = {
  component: OpenCellIdWithOverture,
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
} satisfies Meta<typeof OpenCellIdWithOverture>;

export default meta;
type Story = StoryObj<typeof OpenCellIdWithOverture>;

export const Preview: Story = {};
