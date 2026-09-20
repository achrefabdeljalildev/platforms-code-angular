import type { Meta, StoryObj } from '@storybook/angular';
import { expect, fn, userEvent, within } from '@storybook/test';
import { ButtonCloseComponent } from './button-close.component';

const meta: Meta<ButtonCloseComponent> = {
  title: 'Components/Button Close',
  component: ButtonCloseComponent,
  render: (args) => ({
    props: args,
    template: `<app-button-close [size]="size" [onColor]="onColor" [disabled]="disabled"
      [label]="label" (activated)="activated($event)" />`,
  }),
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { matchers: { color: /background$/i } },
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['x-small', 'small', 'medium', 'large'],
    },
    onColor: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    activated: { control: false },
  },
  args: {
    size: 'small',
    onColor: false,
    disabled: false,
    label: 'Close',
    activated: fn(),
  },
};

export default meta;
type Story = StoryObj<ButtonCloseComponent>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole('button', { name: 'Close' });
    await expect(button).toHaveAttribute('type', 'button');
    button.focus();
    await expect(button).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(args.activated).toHaveBeenCalledTimes(1);
  },
};

export const AllSizes: Story = {
  render: () => ({
    props: { sizes: ['x-small', 'small', 'medium', 'large'] },
    template: `
      <div class="flex flex-wrap items-center gap-4 p-4">
        @for (size of sizes; track size) { <app-button-close [size]="size" /> }
      </div>
      <div class="flex flex-wrap items-center gap-4 bg-primary-800 p-4">
        @for (size of sizes; track size) { <app-button-close [size]="size" [onColor]="true" /> }
      </div>`,
  }),
};

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole('button', { name: 'Close' });
    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(args.activated).not.toHaveBeenCalled();
  },
};
