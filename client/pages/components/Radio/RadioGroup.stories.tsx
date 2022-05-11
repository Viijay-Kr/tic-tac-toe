import React from "react";

import { ComponentStory } from "@storybook/react";

import { RadioGroup } from "./RadioGroup";

export default {
  title: "RadioGroup",
  component: RadioGroup,
};

export const Basic: ComponentStory<typeof RadioGroup> = (args) => (
  <RadioGroup {...args} />
);

Basic.args = {
  values: ["Radio 1", "Radio 2", "Radio 3"],
  defaultValue: "Radio 1",
};
