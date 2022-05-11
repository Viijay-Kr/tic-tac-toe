import React from "react";

import { ComponentStory } from "@storybook/react";

import { Circle } from "./";

export default {
  title: "Circle",
  component: Circle,
};

export const Basic: ComponentStory<typeof Circle> = () => <Circle />;
