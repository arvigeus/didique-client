// @flow
import cx from "classnames";
import React from "react";

type TogglePropsType = {
  id: string,
  className?: string,
  label: string,
  checkedText?: string,
  uncheckedText?: string
};

const Toggle = ({
  id,
  className,
  label,
  checkedText = "Yes",
  uncheckedText = "No",
  ...props
}: TogglePropsType) => (
  <div className={cx("toggle", className)}>
    <span>{label}</span> <input id={id} type="checkbox" {...props} />
    <label htmlFor={id} data-off={uncheckedText} data-on={checkedText} />
  </div>
);

export default Toggle;
