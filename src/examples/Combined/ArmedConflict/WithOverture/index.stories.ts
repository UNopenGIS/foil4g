import { Meta, StoryObj } from "@storybook/react";
import { ArmedConflictWithOverture } from ".";
import { mapStyleOptions } from "../../../../components/mapStyleOptions";

const meta = {
  component: ArmedConflictWithOverture,
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
} satisfies Meta<typeof ArmedConflictWithOverture>;

export default meta;
type Story = StoryObj<typeof ArmedConflictWithOverture>;

export const Preview: Story = {};
