// @flow
import Field from "components/Input/Field";
import SearchIcon from "components/icons/Search";
import React from "react";

type SearchPropsType = {
  id: string,
  className?: string,
  label: string,
  delay?: number,
  onChange: (SyntheticInputEvent<HTMLInputElement>) => void
};

class Search extends React.PureComponent<SearchPropsType> {
  delayId = null;

  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    if (this.delayId) clearTimeout(this.delayId);
    const { onChange, delay } = this.props;
    if (delay) {
      e.persist();
      this.delayId = setTimeout(() => {
        onChange(e);
      }, delay);
    } else onChange(e);
  };

  render() {
    const { id, className, label, onChange, ...props } = this.props;
    return (
      <div className={className}>
        <SearchIcon size={34} className="input-search-icon" />
        <Field
          id={id}
          className="input-search"
          label={label}
          type="search"
          onChange={this.handleChange}
          {...props}
        />
      </div>
    );
  }
}

export default Search;
