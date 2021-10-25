import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Field } from './';
import { createRandomMatrix } from '@/core';
import { BoardSize, FillType } from '@/constants';

export default {
  title: 'Example/Field',
  component: Field,
  argTypes: {
    clickHandler: { action: 'clickHandler' },
  },
} as ComponentMeta<typeof Field>;

const Template: ComponentStory<typeof Field> = (args) => <Field {...args} />;

let size = BoardSize.SMALL;
let fill = FillType.LOW;
let model = createRandomMatrix(size, fill);

export const Small = Template.bind({});
Small.args = { model, size };

size = BoardSize.MEDIUM;
fill = FillType.MEDIUM;
model = createRandomMatrix(size, fill);

export const Medium = Template.bind({});
Medium.args = { model, size };

size = BoardSize.LARGE;
fill = FillType.HIGH;
model = createRandomMatrix(size, fill);

export const Large = Template.bind({});
Large.args = { model, size };
