// @flow
import cx from "classnames";
import React, { PureComponent } from "react";

type DropdownPropsType = {
  id: string,
  className?: string,
  label: string,
  value?: ?string,
  data: any
};

type DropdownStateType = {
  value: ?string
};

class Dropdown extends PureComponent<DropdownPropsType, DropdownStateType> {
  static defaultProps: {
    value: null,
    data: {}
  };

  state = {
    value: this.props.value || ""
  };

  get options(): Array<React$Node> {
    const { data } = this.props;
    const options = [];
    Object.keys(data).forEach(label => {
      const id = data[label];
      if (id.constructor !== {}.constructor) {
        // not an object
        options.push(
          <option key={id} value={id}>
            {label}
          </option>
        );
      } else {
        const optgroup = [];
        Object.keys(id).forEach(opt => {
          optgroup.push(
            <option key={id[opt]} value={id[opt]}>
              {opt}
            </option>
          );
        });
        options.push(
          <optgroup key={label} label={label}>
            {optgroup}
          </optgroup>
        );
      }
    });
    return options;
  }

  handleChange = (event: SyntheticInputEvent<HTMLSelectElement>) => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { id, className, label, data, ...props } = this.props;
    const stateClasses = {};
    stateClasses["has-value"] = !!this.state.value;

    return (
      <div className={cx("select", className, stateClasses)}>
        <label htmlFor={id}>{label}</label>
        <select id={id} {...props} onChange={this.handleChange}>
          <option value={null} />
          {this.options}
        </select>
      </div>
    );
  }
}

export default Dropdown;
