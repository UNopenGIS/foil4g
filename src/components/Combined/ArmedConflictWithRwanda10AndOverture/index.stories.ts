import { Meta, StoryObj } from "@storybook/react";
import { ArmedConflictWithRwanda10AndOverture } from ".";
import { mapStyleOptions } from "../../mapStyleOptions";

const meta = {
  component: ArmedConflictWithRwanda10AndOverture,
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
} satisfies Meta<typeof ArmedConflictWithRwanda10AndOverture>;

export default meta;
type Story = StoryObj<typeof ArmedConflictWithRwanda10AndOverture>;

export const Preview: Story = {};
