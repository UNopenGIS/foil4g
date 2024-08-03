import { Meta, StoryObj } from "@storybook/react";
import { VientianeLanduseMap } from ".";
import { mapStyleOptions } from "../../../components/mapStyleOptions";

const meta = {
  component: VientianeLanduseMap,
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
} satisfies Meta<typeof VientianeLanduseMap>;

export default meta;
type Story = StoryObj<typeof VientianeLanduseMap>;

export const Preview: Story = {};
