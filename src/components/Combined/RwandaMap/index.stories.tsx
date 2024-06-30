import { Meta, StoryObj } from "@storybook/react";
import { RwandaMap } from ".";
import { mapStyleOptions } from "../../mapStyleOptions";

const meta = {
  component: RwandaMap,
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
} satisfies Meta<typeof RwandaMap>;

export default meta;
type Story = StoryObj<typeof RwandaMap>;

export const Preview: Story = {};
