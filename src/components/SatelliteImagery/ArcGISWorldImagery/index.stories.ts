import { Meta, StoryObj } from "@storybook/react";
import { ArcGISWorldImagery } from ".";

const meta = {
  component: ArcGISWorldImagery,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ArcGISWorldImagery>;

export default meta;
type Story = StoryObj<typeof ArcGISWorldImagery>;

export const Preview: Story = {};
