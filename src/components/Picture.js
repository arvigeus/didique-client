// @flow
import cx from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Picture.module.css";

type PicturePropsType = {
  name?: string,
  link?: string,
  className?: string,
  attachmentType?: "tape" | "clip" | "pin",
  src: string,
  portrait: boolean,
  isOffline?: boolean,
  rotation?: number
};

const Attachment = ({ type }) => {
  switch (type) {
    case "clip":
      return (
        <>
          <div className={styles["paperclip-top"]} />
          <div className={styles["paperclip-bottom"]} />
        </>
      );
    case "pin":
      return <div className={styles.pin} />;
    case "tape":
      return <div className={styles.tape} />;
    default:
      return null;
  }
};

const Picture = ({
  name,
  link,
  className,
  attachmentType,
  src,
  portrait,
  isOffline,
  rotation,
  ...props
}: PicturePropsType) => (
  <Link
    to={link || "#"}
    className={cx(styles.picture, { [styles.portrait]: portrait }, className)}
    {...props}
  >
    <div
      className={styles.polarized}
      title={name}
      style={{
        transform: rotation ? `rotate(${rotation}deg)` : "none"
      }}
    >
      <Attachment type={attachmentType} />
      <div className={styles.photo}>
        <picture>
          <img
            src={src}
            alt={name}
            style={{ filter: isOffline ? "grayscale(100%)" : "none" }}
          />
        </picture>
      </div>
    </div>
  </Link>
);

export default Picture;
