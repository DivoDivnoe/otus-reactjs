import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SpeedType } from '@/reducer/game/speed';

import { App } from './';

export default {
  title: 'Example/App',
  component: App,
  args: {
    speed: SpeedType.MEDIUM,
  },
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App {...args} />;

export const Default = Template;
