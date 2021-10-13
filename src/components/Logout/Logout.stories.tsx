import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Logout } from './Logout';

export default {
  title: 'Example/Logout',
  component: Logout,
  argTypes: {
    logout: { action: 'logout' },
  },
} as ComponentMeta<typeof Logout>;

const Template: ComponentStory<typeof Logout> = (args) => <Logout {...args} />;

export const Default = Template;
