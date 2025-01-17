import { expect } from '@storybook/jest';
import { within, userEvent } from '@storybook/testing-library';

import Counter from './Counter.vue';

export default {
  title: 'Addon/Interactions',
  component: Counter,
};

const Template = (args) => ({
  components: { Counter },
  setup() {
    return { args };
  },
  template: '<counter v-bind="args" />',
});

export const Default = Template.bind({});

Default.play = async ({ canvasElement }) => {
  // TODO: 1 - coming from another story this works, refreshing the browser it fails
  const canvas = within(canvasElement);
  await userEvent.click(await canvas.findByText('Increment'));

  const count = await canvas.findByTestId('count');
  await expect(count.textContent).toEqual('You clicked 1 times');
};
