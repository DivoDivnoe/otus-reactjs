import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import StartPopup from './StartPopup';

export default {
  title: 'Example/Cell',
  component: StartPopup,
  args: {
    isVisible: true,
  },
} as ComponentMeta<typeof StartPopup>;

const Template: ComponentStory<typeof StartPopup> = (args) => (
  <StartPopup {...args} />
);

export const Popup = Template;
