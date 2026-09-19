import type { Meta, StoryObj } from '@storybook/angular';
import { AvatarComponent } from './avatar.component';

const meta: Meta<AvatarComponent> = {
  title: 'Components/Avatar',
  component: AvatarComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: [24, 32, 40, 48, 64, 80, 120],
    },
    shape: {
      control: { type: 'radio' },
      options: ['circle', 'square'],
    },
    type: {
      control: { type: 'radio' },
      options: ['initials', 'icon', 'image'],
    },
    border: { control: 'boolean' },
    text: { control: 'text' },
    imageSrc: { control: 'text' },
    imageAlt: { control: 'text' },
    iconSrc: { control: 'text' },
  },
  args: {
    size: 40,
    shape: 'circle',
    type: 'initials',
    text: 'AB',
    border: false,
  },
};

export default meta;
type Story = StoryObj<AvatarComponent>;

export const Initials: Story = {
  args: { type: 'initials', text: 'AB' },
};

export const Icon: Story = {
  args: { type: 'icon' },
};

export const Image: Story = {
  args: { type: 'image' },
};

export const Square: Story = {
  args: { shape: 'square', type: 'initials' },
};

export const WithRing: Story = {
  args: { border: true },
};

export const AllSizes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="flex items-end gap-5">
        <app-avatar [shape]="shape" [type]="type" [text]="text" [border]="border" [size]="24"></app-avatar>
        <app-avatar [shape]="shape" [type]="type" [text]="text" [border]="border" [size]="32"></app-avatar>
        <app-avatar [shape]="shape" [type]="type" [text]="text" [border]="border" [size]="40"></app-avatar>
        <app-avatar [shape]="shape" [type]="type" [text]="text" [border]="border" [size]="48"></app-avatar>
        <app-avatar [shape]="shape" [type]="type" [text]="text" [border]="border" [size]="64"></app-avatar>
        <app-avatar [shape]="shape" [type]="type" [text]="text" [border]="border" [size]="80"></app-avatar>
        <app-avatar [shape]="shape" [type]="type" [text]="text" [border]="border" [size]="120"></app-avatar>
      </div>
    `,
  }),
};
