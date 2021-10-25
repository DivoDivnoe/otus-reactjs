import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BoardSize, FillType, SpeedType } from '@/constants';

import { App } from './';

export default {
  title: 'Example/App',
  component: App,
  args: {
    speed: SpeedType.MEDIUM,
  },
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App {...args} />;

export const Large = Template.bind({});
Large.args = {
  size: BoardSize.LARGE,
  fill: FillType.HIGH,
};

export const Medium = Template.bind({});
Medium.args = {
  size: BoardSize.MEDIUM,
  fill: FillType.LOW,
};

export const Small = Template.bind({});
Small.args = {
  size: BoardSize.SMALL,
  fill: FillType.MEDIUM,
};
