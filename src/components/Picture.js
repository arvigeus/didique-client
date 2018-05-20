// @flow
import cx from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Picture.module.css";

type PicturePropsType = {
  name?: string,
  link?: string,
  className?: string,
  src: string,
  portrait: boolean,
  effects?: {
    grayscale?: boolean,
    rotation?: number
  }
};

const Picture = ({
  name,
  link,
  className,
  src,
  portrait,
  effects,
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
        transform:
          effects && effects.rotation
            ? `rotate(${effects.rotation}deg)`
            : "none"
      }}
    >
      <div className={styles.photo}>
        <picture>
          <img
            src={src}
            alt={name}
            style={{
              filter: effects && effects.grayscale ? "grayscale(100%)" : "none"
            }}
          />
        </picture>
      </div>
    </div>
  </Link>
);

export default Picture;
