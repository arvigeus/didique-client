// @flow
import Note from "components/Note";
import React from "react";
import styles from "./Popup.module.css";

type PopupPropsType = {
  cancel: () => void,
  children: any
};

const Popup = ({ cancel, children, ...props }: PopupPropsType) => (
  <div className={styles.container}>
    <div className={styles.overlay} onClick={cancel} />
    <Note className={styles.popup} cancel={cancel} {...props}>
      {children}
    </Note>
  </div>
);

export default Popup;
