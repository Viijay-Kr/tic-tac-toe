import React from "react";

import { ComponentStory } from "@storybook/react";

import { Grid } from "./";

export default {
  title: "Grid",
  component: Grid,
};

export const Basic: ComponentStory<typeof Grid> = (args) => <Grid {...args} />;
