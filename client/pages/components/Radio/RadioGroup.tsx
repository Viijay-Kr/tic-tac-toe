import classNames from "classnames";
import React from "react";
import { Radio } from ".";
import styles from "./Radio.module.scss";
interface Props {
  classes?: string[];
  defaultValue?: string;
  values: string[];
  onChange?: (value: string) => void;
}
export const RadioGroup: React.FC<Props> = ({
  values,
  defaultValue,
  classes,
  onChange,
}) => {
  const [activeValue, setActiveValue] = React.useState(defaultValue);
  const onSelect = (value: string) => {
    onChange?.(value);
    setActiveValue(value);
  };
  return (
    <div className={classNames(styles["radio-group"], classes)}>
      {values.map((val) => (
        <Radio
          key={val}
          onChange={onSelect}
          defaultValue={activeValue === val ? activeValue : undefined}
          value={val}
          label={val}
        />
      ))}
    </div>
  );
};
