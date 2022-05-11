import React from "react";

import { ComponentStory } from "@storybook/react";

import { Radio } from ".";

export default {
  title: "Radio",
  component: Radio,
};

export const Basic: ComponentStory<typeof Radio> = (args) => (
  <Radio {...args} />
);

Basic.args = {
  label: "Radio",
};
