import React from "react";

import { ComponentStory } from "@storybook/react";

import { TextBox } from "./";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "TextBox",
  component: TextBox,
};

export const Basic: ComponentStory<typeof TextBox> = (args) => (
  <TextBox {...args} />
);

Basic.args = {
  placeholder: "Your name",
};
