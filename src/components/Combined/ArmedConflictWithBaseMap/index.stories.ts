import { Meta, StoryObj } from "@storybook/react";
import { ArmedConflictWithBaseMap } from ".";
import { mapStyleOptions } from "../../mapStyleOptions";

const meta = {
  component: ArmedConflictWithBaseMap,
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
} satisfies Meta<typeof ArmedConflictWithBaseMap>;

export default meta;
type Story = StoryObj<typeof ArmedConflictWithBaseMap>;

export const Preview: Story = {};
