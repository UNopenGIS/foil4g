import { Meta, StoryObj } from "@storybook/react";
import { GSISeamlessPhoto } from ".";

const meta = {
  component: GSISeamlessPhoto,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof GSISeamlessPhoto>;

export default meta;
type Story = StoryObj<typeof GSISeamlessPhoto>;

export const Preview: Story = {};
