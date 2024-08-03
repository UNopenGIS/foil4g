import { Meta, StoryObj } from "@storybook/react";
import { ArmedConflictWithRwanda10WithOverture } from ".";
import { mapStyleOptions } from "../../../../../components/mapStyleOptions";


const meta = {
  component: ArmedConflictWithRwanda10WithOverture,
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
} satisfies Meta<typeof ArmedConflictWithRwanda10WithOverture>;

export default meta;
type Story = StoryObj<typeof ArmedConflictWithRwanda10WithOverture>;

export const Preview: Story = {};
