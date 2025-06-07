import { Meta, StoryObj } from "@storybook/react-vite";
import { OpenCellIdWithDEM1A } from ".";
import { mapStyleOptions } from "../../../../components/mapStyleOptions";

const meta = {
  component: OpenCellIdWithDEM1A,
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
} satisfies Meta<typeof OpenCellIdWithDEM1A>;

export default meta;
type Story = StoryObj<typeof OpenCellIdWithDEM1A>;

export const Preview: Story = {};
