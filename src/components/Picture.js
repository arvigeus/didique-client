// @flow
import cx from "classnames";
import emptySrc from "images/empty.png";
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
    rotate?: number
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
      draggable={false}
      {...props}
    >
      <div
        className={styles.polarized}
        title={name}
        style={{
          transform:
            effects && effects.rotate ? `rotate(${effects.rotate}deg)` : "none"
        }}
      >
        <div className={styles.photo}>
          <picture>
            <img
              src={src || emptySrc}
              alt={name}
              style={{
                filter: effects && effects.grayscale ? "grayscale(100%)" : "none"
              }}
              draggable={false}
            />
          </picture>
        </div>
      </div>
    </Link>
  );

export default Picture;
