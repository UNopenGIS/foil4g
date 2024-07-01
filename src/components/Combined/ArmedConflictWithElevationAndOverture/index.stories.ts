import { Meta, StoryObj } from "@storybook/react";
import { ArmedConflictWithElevationAndOverture } from ".";
import { mapStyleOptions } from "../../mapStyleOptions";

const meta = {
  component: ArmedConflictWithElevationAndOverture,
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
} satisfies Meta<typeof ArmedConflictWithElevationAndOverture>;

export default meta;
type Story = StoryObj<typeof ArmedConflictWithElevationAndOverture>;

export const Preview: Story = {};
