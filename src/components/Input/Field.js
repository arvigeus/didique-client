// @flow
import cx from "classnames";
import React, { PureComponent } from "react";
import Hint from "./Hint";

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
  title?: string,
  required?: boolean,
  pattern?: string,
  hint?: string,
  error?: string,
  onChange?: (SyntheticInputEvent<HTMLInputElement>) => void,
  onBlur?: (SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus?: (SyntheticInputEvent<HTMLInputElement>) => void
};

type FieldStateType = {
  hasValue: boolean,
  hasFocus: boolean,
  hint: ?string
};

const emailRegExp = "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}$";

class Field extends PureComponent<FieldPropsType, FieldStateType> {
  static defaultProps: {
    type: "text"
  };

  state = {
    hasValue: !!this.props.value,
    hasFocus: false,
    hint: this.props.error
  };

  validate = (value: string): boolean =>
    (!this.patternRegExp || this.patternRegExp.test(value)) &&
    (!this.props.required || !!value);

  patternRegExp = this.props.pattern
    ? new RegExp(this.props.pattern)
    : this.props.type === "email"
      ? new RegExp(emailRegExp, "i")
      : null;

  handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { title } = this.props;
    const elem = event.target;
    this.setState({
      hasValue: !!elem.value,
      hint: !this.validate(elem.value) ? title : null
    });
    if (this.props.type === "textarea") {
      elem.style.height = "auto";
      elem.style.height = elem.scrollHeight + "px";
      elem.scrollTop = elem.scrollHeight;
    }
    if (this.props.onChange) this.props.onChange(event);
  };

  handleFocus = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ hasFocus: true });
    if (this.props.onFocus) this.props.onFocus(event);
  };

  handleBlur = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { onBlur } = this.props;
    this.setState({ hasFocus: false });
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
      hint: defaultHint,
      required,
      pattern,
      ...props
    } = this.props;
    const { hasValue, hasFocus, hint } = this.state;

    const inputAttr = {
      id,
      name: id,
      required,
      pattern: required ? pattern : null,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur
    };

    return (
      <div
        className={cx("field", className, {
          "has-value": hasValue,
          "has-focus": hasFocus
        })}
      >
        <label htmlFor={id}>{label}</label>
        {type !== "textarea" ? (
          <input type={type} {...inputAttr} {...props} />
        ) : (
          <textarea {...inputAttr} {...props} />
        )}
        <Hint
          hasValue={hasValue}
          required={required}
          defaultHint={defaultHint}
          hint={hint}
        />
      </div>
    );
  }
}

export default Field;
