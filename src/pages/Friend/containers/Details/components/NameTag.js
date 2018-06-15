// @flow
import React from "react";
import styles from "./NameTag.module.css";

type NameTagPropsType = {
  name: string,
  formName: string,
  rotate: number
};

const NameTag = ({ name, formName, rotate, ...props }: NameTagPropsType) => (
  <div
    className={styles.wrapper}
    style={rotate ? { transform: `rotate(${rotate}deg)` } : null}
  >
    <div className={styles.top}>
      <h1 className={styles.title}>HELLO</h1>
      <h2 className={styles.subtitle}>my name is</h2>
    </div>
    <input
      type="text"
      placeholder="Enter Name"
      className={styles.name}
      defaultValue={name}
      name={formName}
      {...props}
    />
    <div className={styles.bottom} />
  </div>
);

export default NameTag;
