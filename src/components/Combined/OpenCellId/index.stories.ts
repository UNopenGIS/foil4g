import { Meta, StoryObj } from "@storybook/react";
import { OpenCellIdWithStyle } from ".";

const meta = {
  component: OpenCellIdWithStyle,
  argTypes: {
    mapStyle: {
      options: [
        "stylejson/tile.openstreetmap.jp/fiord-color-gl-style/style.json",
        "stylejson/tile.openstreetmap.fr/hot/style.json",
        "stylejson/tile.openstreetmap.org/style.json",
        "https://tile.openstreetmap.jp/styles/osm-bright/style.json",
        "stylejson/geoservices.un.org/clearmap/style.json",
        "stylejson/server.arcgisonline.com/world_imagery/style.json",
        "stylejson/cyberjapandata.gsi.go.jp/xyz/seamlessphoto/style.json",
      ],
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
} satisfies Meta<typeof OpenCellIdWithStyle>;

export default meta;
type Story = StoryObj<typeof OpenCellIdWithStyle>;

export const Preview: Story = {};
