import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './Button';

export default {
  title: 'Example/Button',
  component: Button,
  args: {
    children: 'Button',
    isDisabled: false,
  },
  argTypes: {
    clickHandler: { action: 'clicked' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Inactive = Template.bind({});
Inactive.args = { isActive: false };

export const Active = Template.bind({});
Active.args = { isActive: true };
