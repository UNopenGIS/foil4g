import {Meta, StoryObj} from "@storybook/react";
import {DeckGLArcLayer} from ".";
import {mapStyleOptions} from "../../../components/mapStyleOptions";

const meta = {
  component: DeckGLArcLayer,
  argTypes: {
    mapStyle: {
      options: mapStyleOptions,
      control: {type: "select"},
    },
  },
  args: {
    mapStyle: "stylejson/tile.openstreetmap.jp/fiord-color-gl-style/style.json",
  },
  parameters: {
    layout: "fullscreen",
    options: {bottomPanelHeight: 300},
  },
} satisfies Meta<typeof DeckGLArcLayer>;

export default meta;
type Story = StoryObj<typeof DeckGLArcLayer>;

export const Preview: Story = {};
