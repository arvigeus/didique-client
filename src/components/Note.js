// @flow
import cx from "classnames";
import CloseIcon from "components/icons/Close";
import React from "react";
import styles from "./Note.module.css";

type NotePropsType = {
  className?: string,
  title?: string,
  cancel?: () => void,
  children: any
};

const Note = ({ className, title, cancel, children }: NotePropsType) => (
  <div className={cx(styles.note, className)}>
    {title || cancel ? (
      <div className={styles.header}>
        <div className={cx(styles.title, { [styles["title-line"]]: !!title })}>
          {title}
        </div>
        <CloseIcon size={28} className={styles.close} onClick={cancel} />
      </div>
    ) : null}
    {children}
  </div>
);

export default Note;
