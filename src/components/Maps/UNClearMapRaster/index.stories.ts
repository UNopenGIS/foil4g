import { Meta, StoryObj } from "@storybook/react-vite";
import { UNClearMapRaster as MapComponent } from ".";

const meta: Meta<typeof MapComponent> = {
  component: MapComponent,
  title: "Maps/UNClearMapRaster",
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MapComponent>;

export default meta;
type Story = StoryObj<typeof MapComponent>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: `
UN Clear Map with integrated operational data layers:
- Armed conflict data visualization
- Population density overlay
- Terrain visualization
- Interactive layer controls
        `,
      },
    },
  },
};
