// @flow
import React from "react";
import cx from "classnames";

type CheckboxPropsType = {
  id: string,
  className?: string,
  label?: string,
  children: any
};

const Checkbox = ({
  id,
  className,
  label,
  children,
  ...props
}: CheckboxPropsType) => (
  <div className={cx("checkbox", className)}>
    <input type="checkbox" id={id} {...props} />
    <label htmlFor={id}>{label || children}</label>
  </div>
);

export default Checkbox;
