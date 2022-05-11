import classNames from "classnames";
import React from "react";
import styles from "./TextBox.module.scss";
interface Props {
  placeholder?: string;
  classes?: string[];
  onChange?: (value: string) => void;
  defaultValue?: string;
}
export const TextBox: React.FC<Props> = ({
  placeholder = "",
  classes,
  onChange,
}) => {
  return (
    <input
      className={classNames(styles["text-box"], classes)}
      placeholder={placeholder}
      type="text"
      onChange={(e) => {
        const { value } = e.target;
        onChange?.(value);
      }}
    />
  );
};
