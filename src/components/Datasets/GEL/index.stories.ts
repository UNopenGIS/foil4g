import { Meta, StoryObj } from '@storybook/react';
import { GELMap } from '.';

const meta: Meta<typeof GELMap> = {
  component: GELMap,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof GELMap>;

export default meta;
type Story = StoryObj<typeof GELMap>;

export const Preview: Story = {};
