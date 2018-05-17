// @flow
import React, { PureComponent } from "react";
import cx from "classnames";

type FieldPropsType = {
  type:
    | "text"
    | "textarea"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "search"
    | "url",
  id: string,
  className?: string,
  label: string,
  value?: string,
  error?: string
};

type FieldStateType = {
  value: string,
  hasFocus: boolean
};

class Field extends PureComponent<FieldPropsType, FieldStateType> {
  static defaultProps: {
    type: "text"
  };

  state = {
    value: this.props.value || "",
    hasFocus: false
  };

  handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const elem = event.target;
    this.setState({ value: elem.value });
    if (this.props.type === "textarea") {
      elem.style.height = "auto";
      elem.style.height = elem.scrollHeight + "px";
      elem.scrollTop = elem.scrollHeight;
    }
  };

  handleFocus = () => {
    this.setState({ hasFocus: false });
  };

  handleBlur = () => {
    this.setState({ hasFocus: false });
  };

  render() {
    const { type, id, className, label, ...props } = this.props;
    const { value, hasFocus } = this.state;

    const stateClasses = {};
    stateClasses["has-value"] = !!value;
    stateClasses["has-focus"] = hasFocus;

    const inputAttr = {
      id,
      name: id,
      value,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onBlur: this.handleFocus
    };

    return (
      <div className={cx("field", className, stateClasses)}>
        <label htmlFor={id}>{label}</label>
        {type !== "textarea" ? (
          <input type={type} {...inputAttr} {...props} />
        ) : (
          <textarea {...inputAttr} {...props} />
        )}
      </div>
    );
  }
}

export default Field;
