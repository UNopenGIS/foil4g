import { Meta, StoryObj } from "@storybook/react-vite";
import { BasicReactGoogleMaps } from ".";

const meta: Meta<typeof BasicReactGoogleMaps> = {
  component: BasicReactGoogleMaps,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof BasicReactGoogleMaps>;

export const Preview: Story = {};
