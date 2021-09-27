import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BoardSize, FillType, SpeedType } from '@/constants';
import { createRandomMatrix } from '@/hocs/withGameLogicHOC';

import { App } from './App';

export default {
  title: 'Example/App',
  component: App,
  argTypes: {
    clickHandler: { action: 'clickHandler' },
    changeSizeHandler: { action: 'changeSizeHandler' },
    changeSpeedHandler: { action: 'changeSpeedHandler' },
    changeFillType: { action: 'changeFillType' },
    play: { action: 'play' },
    pause: { action: 'pause' },
    clear: { action: 'clear' },
    setUser: { action: 'setUser' },
  },
  args: {
    speed: SpeedType.MEDIUM,
    sizes: [BoardSize.SMALL, BoardSize.MEDIUM, BoardSize.LARGE],
    speedTypes: [SpeedType.SLOW, SpeedType.MEDIUM, SpeedType.FAST],
    fillTypes: [FillType.LOW, FillType.MEDIUM, FillType.HIGH],
    isPlaying: false,
  },
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App {...args} />;

export const WithNoUser = Template.bind({});
WithNoUser.args = {
  size: BoardSize.LARGE,
  fill: FillType.HIGH,
  model: createRandomMatrix(BoardSize.LARGE, FillType.HIGH),
  user: null,
};

export const Large = Template.bind({});
Large.args = {
  size: BoardSize.LARGE,
  fill: FillType.HIGH,
  model: createRandomMatrix(BoardSize.LARGE, FillType.HIGH),
  user: 'Andrey',
};

export const Medium = Template.bind({});
Medium.args = {
  size: BoardSize.MEDIUM,
  fill: FillType.LOW,
  model: createRandomMatrix(BoardSize.MEDIUM, FillType.LOW),
  user: 'Andrey',
};

export const Small = Template.bind({});
Small.args = {
  size: BoardSize.SMALL,
  fill: FillType.MEDIUM,
  model: createRandomMatrix(BoardSize.SMALL, FillType.MEDIUM),
  user: 'Andrey',
};
