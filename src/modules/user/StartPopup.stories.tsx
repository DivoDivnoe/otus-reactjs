import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { StartPopup } from './';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '@/reducer';

export default {
  title: 'Example/StartPopup',
  component: StartPopup,
} as ComponentMeta<typeof StartPopup>;

const store = createStore(reducer);

const Template: ComponentStory<typeof StartPopup> = (args) => (
  <Provider store={store}>
    <StartPopup {...args} />
  </Provider>
);

export const Popup = Template;
