// @flow
import cx from "classnames";
import React, { PureComponent } from "react";

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
  error?: string,
  onChange?: (SyntheticInputEvent<HTMLInputElement>) => void,
  onBlur?: (SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus?: (SyntheticInputEvent<HTMLInputElement>) => void
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
    if (this.props.onChange) this.props.onChange(event);
  };

  handleFocus = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ hasFocus: false });
    if (this.props.onFocus) this.props.onFocus(event);
  };

  handleBlur = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ hasFocus: false });
    if (this.props.onBlur) this.props.onBlur(event);
  };

  render() {
    const {
      type,
      id,
      className,
      label,
      onChange,
      onFocus,
      onBlur,
      ...props
    } = this.props;
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
