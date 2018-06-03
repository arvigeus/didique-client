// @flow
import React from "react";

type HintPropsType = {
  hasValue: boolean,
  required: ?boolean,
  defaultHint: ?string,
  hint: ?string
};

const Hint = ({ required, defaultHint, hint }: HintPropsType) =>
  required || defaultHint || hint ? (
    <div className={!hint ? "hint" : required ? "error" : "warning"}>
      {required && !defaultHint && !hint
        ? "Required"
        : `${required ? "[Required] " : ""}${hint || defaultHint || "Invalid"}`}
    </div>
  ) : null;

export default Hint;
