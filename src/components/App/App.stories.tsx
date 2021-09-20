import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BoardSize, FillType } from '@/constants';

import App from './App';

export default {
  title: 'Example/App',
  component: App,
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Large = Template.bind({});
Large.args = {
  size: BoardSize.LARGE,
  fill: FillType.HIGH,
};
