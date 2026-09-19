import type { Meta, StoryObj } from '@storybook/angular';
import { AccordionComponent } from './accordion.component';

const meta: Meta<AccordionComponent> = {
  title: 'Components/Accordion',
  component: AccordionComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large'],
    },
    iconPosition: {
      control: { type: 'radio' },
      options: ['leading', 'trailing'],
    },
    disabled: { control: 'boolean' },
    expanded: { control: 'boolean' },
    flush: { control: 'boolean' },
    title: { control: 'text' },
  },
  args: {
    title: 'Accordion Title',
    size: 'large',
    iconPosition: 'trailing',
    disabled: false,
    expanded: false,
    flush: false,
  },
};

export default meta;
type Story = StoryObj<AccordionComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <app-accordion
        [title]="title"
        [size]="size"
        [iconPosition]="iconPosition"
        [disabled]="disabled"
        [expanded]="expanded"
        [flush]="flush"
      >
        <p accordion-content>
          Accordion content keeps related information organized and lets users reveal details when needed.
        </p>
      </app-accordion>
    `,
  }),
};

export const Expanded: Story = {
  args: {
    expanded: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <app-accordion [title]="title" [size]="size" [expanded]="expanded">
        <p accordion-content>
          Accordion content keeps related information organized and lets users reveal details when needed.
        </p>
      </app-accordion>
    `,
  }),
};

export const LeadingIcon: Story = {
  args: { iconPosition: 'leading' },
};

export const Flush: Story = {
  args: { flush: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const AccordionList: Story = {
  render: () => ({
    template: `
      <div class="w-full max-w-[366px]">
        <app-accordion title="What is Platforms Code?">
          <p accordion-content>
            Platforms Code is a shared design system for building consistent digital experiences.
          </p>
        </app-accordion>
        <app-accordion title="How do I use the components?">
          <p accordion-content>
            Choose a component, configure its inputs, and compose it in your Angular application.
          </p>
        </app-accordion>
        <app-accordion title="Where can I find the foundations?">
          <p accordion-content>
            The Foundations section documents the shared colors, typography, spacing, grid, and effects.
          </p>
        </app-accordion>
      </div>
    `,
  }),
};
