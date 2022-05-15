import classNames from "classnames";
import React from "react";
import { Circle } from "../Circle";
import { Cross } from "../Cross";

import styles from "./Grid.module.scss";

interface Props {
  circles?: number[];
  crosses?: number[];
  layout?: number;
  classes?: string;
  onBoxClick?: (boxNumber: number) => void;
}
export const Grid: React.FC<Props> = ({
  circles = [],
  crosses = [],
  layout = 9,
  onBoxClick,
  classes,
}) => {
  const onBoxClickHandler = (boxNumber: number) => () =>
    onBoxClick?.(boxNumber);
  return (
    <div className={classNames(styles.container, classes)}>
      {Array.from(Array(layout).keys()).map((i) => (
        <div
          key={i}
          onClick={onBoxClickHandler(i + 1)}
          className={classNames(styles["box"], styles[`box-${i + 1}`])}
        >
          {circles.includes(i + 1) && <Circle classes={[styles.circle]} />}
          {crosses.includes(i + 1) && <Cross classes={[styles.cross]} />}
        </div>
      ))}
    </div>
  );
};
