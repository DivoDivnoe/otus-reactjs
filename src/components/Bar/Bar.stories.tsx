import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BoardSize } from '@/reducer/game/size';
import { SpeedType } from '@/reducer/game/speed';
import { FillType } from '@/reducer/game/fill';

import { Bar } from './';

export default {
  title: 'Example/Bar',
  component: Bar,
  argTypes: {
    changeSizeHandler: { action: 'changeSizeHandler' },
    changeSpeedHandler: { action: 'changeSpeedHandler' },
    changeFillType: { action: 'changeFillType' },
    play: { action: 'play' },
    pause: { action: 'pause' },
    clear: { action: 'clear' },
  },
} as ComponentMeta<typeof Bar>;

const Template: ComponentStory<typeof Bar> = (args) => <Bar {...args} />;

export const MainBar = Template.bind({});
MainBar.args = {
  sizes: [BoardSize.SMALL, BoardSize.MEDIUM, BoardSize.LARGE],
  speedTypes: [SpeedType.SLOW, SpeedType.MEDIUM, SpeedType.FAST],
  fillTypes: [FillType.LOW, FillType.MEDIUM, FillType.HIGH],
  size: BoardSize.SMALL,
  speed: SpeedType.SLOW,
  fill: FillType.LOW,
};
