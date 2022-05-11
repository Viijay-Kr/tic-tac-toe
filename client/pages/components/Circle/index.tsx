import React from "react";
import styles from "./Circle.module.scss";
import classNames from "classnames";

interface Props {
  size?: number;
  classes?: string[];
}
export const Circle: React.FC<Props> = ({ size, classes }) => {
  return (
    <div className={classNames(styles.container)}>
      <i className={classNames(styles.circle, classes)} />
    </div>
  );
};
