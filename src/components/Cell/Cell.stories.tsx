import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Cell from './Cell';

export default {
  title: 'Example/Cell',
  component: Cell,
  args: {
    coords: {
      x: 0,
      y: 0,
    },
  },
  argTypes: {
    clickHandler: { action: 'clickHandler' },
  },
} as ComponentMeta<typeof Cell>;

const Template: ComponentStory<typeof Cell> = (args) => <Cell {...args} />;

export const Inactive = Template.bind({});
Inactive.args = { isActive: false };

export const Active = Template.bind({});
Active.args = { isActive: true };
