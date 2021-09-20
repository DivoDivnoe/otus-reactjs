import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Field from './Field';
import { createRandomMatrix } from '../App/App';
import { BoardSize, FillType } from '@/constants';

export default {
  title: 'Example/Field',
  component: Field,
} as ComponentMeta<typeof Field>;

const Template: ComponentStory<typeof Field> = (args) => <Field {...args} />;

let size = BoardSize.SMALL;
let fill = FillType.LOW;
let model = createRandomMatrix(size, fill);

export const SmallField = Template.bind({});
SmallField.args = { model, size };

size = BoardSize.MEDIUM;
fill = FillType.MEDIUM;
model = createRandomMatrix(size, fill);

export const MediumField = Template.bind({});
MediumField.args = { model, size };

size = BoardSize.LARGE;
fill = FillType.HIGH;
model = createRandomMatrix(size, fill);

export const LargeField = Template.bind({});
LargeField.args = { model, size };
