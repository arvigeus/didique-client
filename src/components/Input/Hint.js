import React from "react";

const Hint = ({ required, defaultHint, hint }) =>
  required || defaultHint || hint ? (
    <div className={!hint ? "hint" : required ? "error" : "warning"}>
      {required && !defaultHint && !hint
        ? "Required"
        : `${required ? "[Required] " : ""}${hint || defaultHint || "Invalid"}`}
    </div>
  ) : null;

export default Hint;
