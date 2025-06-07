import { Meta, StoryObj } from "@storybook/react-vite";
import { BasicReactMapGLMap } from ".";

const meta = {
  component: BasicReactMapGLMap,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof BasicReactMapGLMap>;

export default meta;

type Story = StoryObj<typeof BasicReactMapGLMap>;

export const Preview: Story = {};
