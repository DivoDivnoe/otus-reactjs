import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import App from "./App";

export default {
  title: "Example/App",
  component: App,
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Small = Template.bind({});
Small.args = {
  size: { width: 10, height: 10 },
};
