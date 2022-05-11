import classNames from "classnames";
import React, { useEffect } from "react";
import styles from "./Radio.module.scss";
interface Props {
  classes?: string[];
  defaultValue?: string;
  value: string;
  onChange?: (value: string) => void;
  label?: string;
}
export const Radio: React.FC<Props> = ({
  classes,
  defaultValue,
  value,
  onChange,
  label,
}) => {
  const [isActive, setIsActive] = React.useState(false);
  useEffect(() => {
    setIsActive(!!defaultValue);
  }, [defaultValue]);
  const onInputChange = () => {
    onChange?.(value);
  };
  return (
    <div onClick={onInputChange} className={styles["radio-card"]}>
      <div className={classNames(styles["radio-btn"], classes)}>
        {isActive && <div className={styles["radio-btn-active"]} />}
      </div>
      <label className={styles["label"]}>{label}</label>
    </div>
  );
};
