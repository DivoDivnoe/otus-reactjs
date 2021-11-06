import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Header } from './Header';

export default {
  title: 'Example/Header',
  component: Header,
  argTypes: {
    signout: { action: 'signout' },
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind(this);
Default.args = { user: null };

export const withUser = Template.bind(this);
Default.args = { user: 'Andrey' };
