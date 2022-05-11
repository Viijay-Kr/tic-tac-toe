import classNames from "classnames";
import React from "react";
import styles from "./Cross.module.scss";

interface Props {
  size?: number;
  classes?: string[];
}
export const Cross: React.FC<Props> = ({ classes }) => {
  return (
    <div className={styles.container}>
      <i className={classNames(styles.cross, classes)} />
      <i className={classNames(styles["cross-reverse"], classes)} />
    </div>
  );
};
