import React from "react";

import { ComponentStory } from "@storybook/react";

import { Cross } from "./";

export default {
  title: "Cross",
  component: Cross,
};

export const Basic: ComponentStory<typeof Cross> = () => <Cross />;
