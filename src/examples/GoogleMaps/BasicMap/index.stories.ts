import { Meta, StoryObj } from "@storybook/react";
import { BasicGoogleMap } from ".";

const meta: Meta<typeof BasicGoogleMap> = {
  component: BasicGoogleMap,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof BasicGoogleMap>;

export const Preview: Story = {};
