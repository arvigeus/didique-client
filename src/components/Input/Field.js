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
  validate?: (string => boolean | string) | Array<(string) => boolean | string>,
  hint?: string,
  onChange?: (SyntheticInputEvent<HTMLInputElement>) => void,
  onBlur?: (SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus?: (SyntheticInputEvent<HTMLInputElement>) => void
};

type FieldStateType = {
  value: string,
  hasFocus: boolean,
  hint?: string
};

class Field extends PureComponent<FieldPropsType, FieldStateType> {
  static defaultProps: {
    type: "text"
  };

  state = {
    value: this.props.value || "",
    hasFocus: false,
    hint:
      this.props.hint || this.props.required
        ? { type: "info", message: this.props.hint || "Required" }
        : null
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
    const { hint, required, validate, onBlur } = this.props;
    let valididationHint =
      hint || required ? { type: "info", message: hint || "Required" } : null;
    if (validate) {
      let check;
      if (Array.isArray(validate)) check = validate[0];
      check = validate;
      const result = check(event.target.value);
      if (result !== true) valididationHint = result;
    }
    this.setState({ hasFocus: false, hint: valididationHint });
    if (onBlur) onBlur(event);
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
      validate,
      hint: _, // Unused
      ...props
    } = this.props;
    const { value, hasFocus, hint } = this.state;

    const stateClasses = {};
    stateClasses["has-value"] = !!value;
    stateClasses["has-focus"] = hasFocus;

    const inputAttr = {
      id,
      name: id,
      value,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur
    };

    return (
      <div className={cx("field", className, stateClasses)}>
        <label htmlFor={id}>{label}</label>
        {type !== "textarea" ? (
          <input type={type} {...inputAttr} {...props} />
        ) : (
          <textarea {...inputAttr} {...props} />
        )}
        {hint ? (
          <div key={id} className={hint.type}>
            {hint.message}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Field;
