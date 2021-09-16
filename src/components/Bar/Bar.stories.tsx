import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BoardSize, SpeedType } from '@/constants';

import Bar from './Bar';

export default {
  title: 'Example/Bar',
  component: Bar,
} as ComponentMeta<typeof Bar>;

const Template: ComponentStory<typeof Bar> = (args) => <Bar {...args} />;

export const MainBar = Template.bind({});
MainBar.args = {
  sizes: [BoardSize.SMALL, BoardSize.MEDIUM, BoardSize.LARGE],
  speedTypes: [SpeedType.SLOW, SpeedType.MEDIUM, SpeedType.FAST],
};
