import { Meta, StoryObj } from "@storybook/react-vite";
import { RwandaMap } from ".";
import { mapStyleOptions } from "../../../components/mapStyleOptions";

const meta = {
  component: RwandaMap,
  argTypes: {
    mapStyle: {
      options: mapStyleOptions,
      control: { type: "select" },
    },
    sources: {
      options: ["cell", "conflict", "terrain", "transportation"],
      control: { type: "inline-check" },
    },
  },
  args: {
    mapStyle: "stylejson/tile.openstreetmap.jp/fiord-color-gl-style/style.json",
    sources: ["cell", "conflict", "terrain", "transportation"],
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
