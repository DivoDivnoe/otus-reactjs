import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Field from "./Field";
import { Model } from "../App/App";

export default {
  title: "Example/Field",
  component: Field,
} as ComponentMeta<typeof Field>;

const Template: ComponentStory<typeof Field> = (args) => <Field {...args} />;

const model: Model = [
  [0, 0, 1, 0, 0],
  [1, 0, 0, 0, 0],
  [0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1],
];

export const RandomField = Template.bind({});
RandomField.args = {
  model,
};
