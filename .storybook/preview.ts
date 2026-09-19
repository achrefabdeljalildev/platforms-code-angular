import type { Decorator, Preview } from '@storybook/angular';

export const directionDecorator: Decorator = (story, context) => {
  const direction = context.globals['direction'] === 'rtl' ? 'rtl' : 'ltr';

  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('dir', direction);
  }

  return story();
};

const preview: Preview = {
  globalTypes: {
    direction: {
      name: 'Direction',
      description: 'Global text direction for the Storybook preview',
      defaultValue: 'ltr',
      toolbar: {
        icon: 'globe',
        dynamicTitle: true,
        items: [
          { value: 'ltr', title: 'LTR' },
          { value: 'rtl', title: 'RTL' },
        ],
      },
    },
  },
  initialGlobals: {
    direction: 'ltr',
  },
  decorators: [directionDecorator],
  parameters: {
    options: {
      storySort: {
        order: ['Foundations', 'Components'],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
