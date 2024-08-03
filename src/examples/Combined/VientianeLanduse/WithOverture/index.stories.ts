import { Meta, StoryObj } from "@storybook/react";
import { VientianeLanduseWithOverture } from ".";
import { mapStyleOptions } from "../../../../components/mapStyleOptions";

const meta = {
  component: VientianeLanduseWithOverture,
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
} satisfies Meta<typeof VientianeLanduseWithOverture>;

export default meta;
type Story = StoryObj<typeof VientianeLanduseWithOverture>;

export const Preview: Story = {};
