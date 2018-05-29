import CloseIcon from "components/icons/Close";
import React from "react";
import styles from "./Popup.module.css";

const Popup = ({ cancel, children }) => (
  <div className={styles.container}>
    <div className={styles.overlay} onClick={cancel} />
    <div className={styles.popup}>
      <CloseIcon size={28} className={styles.close} onClick={cancel} />
      {children}
    </div>
  </div>
);

export default Popup;
