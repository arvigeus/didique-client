// @flow
import cx from "classnames";
import React, { PureComponent } from "react";

type DateTimePropsType = {
  id: string,
  className?: string,
  label: string,
  value?: string
};

type DateTimeStateType = {
  value: string,
  hasFocus: boolean
};

class DateTime extends PureComponent<DateTimePropsType, DateTimeStateType> {
  state = {
    value: this.props.value || "",
    hasFocus: false
  };

  handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });
  };

  handleFocus = () => {
    this.setState({ hasFocus: true });
  };

  handleBlur = () => {
    this.setState({ hasFocus: false });
  };

  render() {
    const { id, className, label, ...props } = this.props;
    const { value, hasFocus } = this.state;

    const stateClasses = {};
    stateClasses["has-value"] = !!value;
    stateClasses["has-focus"] = hasFocus;

    return (
      <div className={cx("datetime", className, stateClasses)}>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          name={id}
          type="date"
          value={this.state.value}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          {...props}
        />
      </div>
    );
  }
}

export default DateTime;
