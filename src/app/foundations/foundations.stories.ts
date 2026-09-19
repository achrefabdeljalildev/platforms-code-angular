import type { Meta, StoryObj } from '@storybook/angular';
import { FoundationsComponent } from './foundations.component';

const meta: Meta<FoundationsComponent> = {
  title: 'Foundations/Overview',
  component: FoundationsComponent,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<FoundationsComponent>;

export const Overview: Story = {};
