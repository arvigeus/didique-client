import React from "react";
import MediumEditor from "react-medium-editor";

import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/beagle.css";
import "./Editor.css";

const Editor = ({ children, ...props }) => (
  <MediumEditor
    tag="pre"
    text={children}
    options={{ toolbar: { buttons: ["bold", "italic", "underline"] } }}
    {...props}
  />
);

export default Editor;
