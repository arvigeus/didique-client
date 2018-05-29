// @flow
import cx from "classnames";
import CloseIcon from "components/icons/Close";
import React from "react";
import styles from "./Popup.module.css";

type PopupPropsType = {
  title?: string,
  cancel: () => void,
  children: any
};

const Popup = ({ title, cancel, children }: PopupPropsType) => (
  <div className={styles.container}>
    <div className={styles.overlay} onClick={cancel} />
    <div className={styles.popup}>
      <div className={styles.header}>
        <div className={cx(styles.title, { [styles["title-line"]]: !!title })}>
          {title}
        </div>
        <CloseIcon size={28} className={styles.close} onClick={cancel} />
      </div>
      {children}
    </div>
  </div>
);

export default Popup;
