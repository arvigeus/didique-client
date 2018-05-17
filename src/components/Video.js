// @flow
import React from "react";
import styles from "./Video.module.css";

type VidepPropsType = {
  src: string
};

const Video = ({ src }: VidepPropsType) => (
  <div className={styles.video}>
    <iframe title={src} src={src} frameBorder="0" allowFullScreen />
  </div>
);

export default Video;
