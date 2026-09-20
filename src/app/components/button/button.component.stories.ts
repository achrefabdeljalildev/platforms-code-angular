import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { expect, fn, userEvent, within } from '@storybook/test';
import { ButtonCloseComponent } from './button-close.component';
import { ButtonComponent, ButtonSize, ButtonVariant } from './button.component';

const variants: ButtonVariant[] = [
  'neutral',
  'primary',
  'secondary-solid',
  'secondary-outline',
  'subtle',
  'transparent',
];
const sizes: ButtonSize[] = ['large', 'medium', 'small'];

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [ButtonCloseComponent] })],
  parameters: {
    layout: 'padded',
    controls: { matchers: { color: /background$/i } },
  },
  argTypes: {
    size: { control: 'radio', options: sizes },
    variant: { control: 'select', options: variants },
    type: { control: 'radio', options: ['button', 'submit', 'reset'] },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    destructive: { control: 'boolean' },
    onColor: { control: 'boolean' },
    iconOnly: { control: 'boolean' },
    leadingIcon: { control: 'boolean' },
    trailingIcon: { control: 'boolean' },
    selected: { control: 'boolean' },
    menu: { control: 'boolean' },
    expanded: { control: 'boolean' },
    activated: { control: false },
    expandedChange: { control: false },
  },
  args: {
    label: 'Button',
    size: 'large',
    variant: 'primary',
    type: 'button',
    disabled: false,
    destructive: false,
    onColor: false,
    iconOnly: false,
    leadingIcon: true,
    trailingIcon: false,
    menu: false,
    expanded: false,
    selected: null,
    activated: fn(),
    expandedChange: fn(),
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole('button', {
      name: 'Button',
    });
    await expect(button).toHaveAttribute('type', 'button');
    await userEvent.click(button);
    await expect(args.activated).toHaveBeenCalledTimes(1);
    button.focus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    await expect(args.activated).toHaveBeenCalledTimes(3);
  },
};

export const AllVariants: Story = {
  render: () => ({
    props: { variants, sizes },
    template: `
      <div class="flex flex-wrap gap-8">
        @for (variant of variants; track variant) {
          <section class="flex flex-col items-start gap-4">
            <h2 class="text-body-sm font-medium capitalize">{{ variant }}</h2>
            @for (size of sizes; track size) {
              <div class="flex items-center gap-4">
                <app-button [variant]="variant" [size]="size" />
                <app-button [variant]="variant" [size]="size" [iconOnly]="true" label="Continue" />
                <app-button [variant]="variant" [size]="size" [disabled]="true" />
              </div>
            }
          </section>
        }
      </div>`,
  }),
};

export const Destructive: Story = {
  args: { destructive: true, label: 'Delete' },
};

export const OnColor: Story = {
  render: () => ({
    props: { variants },
    template: `
      <div class="flex flex-wrap gap-6 bg-primary-800 p-6">
        @for (variant of variants; track variant) {
          <div class="flex flex-col items-start gap-4">
            <app-button [variant]="variant" [onColor]="true" />
            <app-button [variant]="variant" [onColor]="true" [destructive]="true" label="Delete" />
            <app-button [variant]="variant" [onColor]="true" [disabled]="true" />
          </div>
        }
      </div>`,
  }),
};

export const IconOnly: Story = {
  args: { iconOnly: true, label: 'Continue' },
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByRole('button', { name: 'Continue' }),
    ).toHaveAttribute('title', 'Continue');
  },
};

export const TrailingIcon: Story = { args: { trailingIcon: true } };
export const TextOnly: Story = { args: { leadingIcon: false } };
export const Selected: Story = { args: { selected: true } };

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole('button');
    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(args.activated).not.toHaveBeenCalled();
  },
};

export const Menu: Story = {
  args: {
    menu: true,
    leadingIcon: false,
    label: 'Options',
    controls: 'button-example-menu',
  },
  render: (args) => ({
    props: {
      ...args,
      focusMenu: (container: HTMLElement, expanded: boolean) => {
        requestAnimationFrame(() =>
          container
            .querySelector<HTMLElement>(
              expanded ? '[role="menuitem"]' : 'app-button button',
            )
            ?.focus(),
        );
      },
      navigateMenu: (event: KeyboardEvent) => {
        const items = Array.from(
          (event.currentTarget as HTMLElement).querySelectorAll<HTMLElement>(
            '[role="menuitem"]',
          ),
        );
        const current = items.indexOf(event.target as HTMLElement);
        const next: Record<string, number> = {
          ArrowDown: (current + 1) % items.length,
          ArrowUp: (current - 1 + items.length) % items.length,
          Home: 0,
          End: items.length - 1,
        };
        if (event.key in next) {
          event.preventDefault();
          items[next[event.key]].focus();
        }
      },
    },
    template: `
      <div #menuDemo class="relative inline-block">
        <app-button [label]="label" [size]="size" [variant]="variant" [disabled]="disabled"
          [iconOnly]="iconOnly" [leadingIcon]="leadingIcon" [menu]="true" [expanded]="expanded"
          controls="button-example-menu" (expandedChange)="expanded = $event; expandedChange($event); focusMenu(menuDemo, $event)"
          (activated)="activated($event)" />
        @if (expanded) {
          <div id="button-example-menu" role="menu" aria-label="Options"
            class="absolute start-0 z-10 mt-2 w-40 rounded-sm border border-gray-300 bg-white p-1 shadow-md"
            (keydown)="navigateMenu($event)"
            (keydown.escape)="expanded = false; focusMenu(menuDemo, false)">
            <button type="button" role="menuitem" class="block w-full rounded-sm px-3 py-2 text-start text-body-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2"
              (click)="expanded = false; focusMenu(menuDemo, false)">Edit</button>
            <button type="button" role="menuitem" class="block w-full rounded-sm px-3 py-2 text-start text-body-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2"
              (click)="expanded = false; focusMenu(menuDemo, false)">Duplicate</button>
          </div>
        }
      </div>`,
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Options' });
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(button);
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await expect(canvas.getByRole('menu')).toBeVisible();
    await userEvent.click(canvas.getByRole('menuitem', { name: 'Edit' }));
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    button.focus();
    await userEvent.keyboard('{ArrowDown}');
    await expect(args.expandedChange).toHaveBeenLastCalledWith(true);
    await userEvent.keyboard('{Escape}');
    await expect(button).toHaveAttribute('aria-expanded', 'false');
  },
};

export const MenuSizes: Story = {
  render: () => ({
    props: { sizes, variants },
    template: `
      <div class="flex flex-wrap gap-8">
        @for (variant of variants; track variant) {
          <section class="flex flex-col items-start gap-4">
            <h2 class="text-body-sm font-medium capitalize">{{ variant }}</h2>
            @for (size of sizes; track size) {
              <div class="flex items-center gap-4">
                <app-button [variant]="variant" [size]="size" [menu]="true" [leadingIcon]="false" />
                <app-button [variant]="variant" [size]="size" [menu]="true" [iconOnly]="true" label="Options" />
              </div>
            }
          </section>
        }
      </div>`,
  }),
};

export const RightToLeft: Story = {
  render: () => ({
    template: `
      <div dir="rtl" class="flex flex-wrap gap-4">
        <app-button label="&#1578;&#1575;&#1604;&#1610;" />
        <app-button label="&#1575;&#1604;&#1582;&#1610;&#1575;&#1585;&#1575;&#1578;" [menu]="true" [leadingIcon]="false" />
        <app-button-close label="&#1573;&#1594;&#1604;&#1575;&#1602;" />
      </div>`,
  }),
};

export const AssetSizes: Story = {
  render: () => ({
    props: { sizes },
    template: `
      <div class="flex flex-wrap gap-6">
        @for (size of sizes; track size) {
          <app-button [size]="size" [trailingIcon]="true" />
          <app-button [size]="size" [menu]="true" [iconOnly]="true" label="Options" />
        }
      </div>`,
  }),
};
