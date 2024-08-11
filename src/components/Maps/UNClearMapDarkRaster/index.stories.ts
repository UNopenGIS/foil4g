import { Meta, StoryObj } from "@storybook/react";
import { UNClearMapDarkRaster as MapComponent } from ".";

const meta: Meta<typeof MapComponent> = {
  component: MapComponent,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof MapComponent>;

export default meta;
type Story = StoryObj<typeof MapComponent>;

export const Preview: Story = {};
