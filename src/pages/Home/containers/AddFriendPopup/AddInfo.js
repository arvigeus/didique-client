import Button from "components/Input/Button";
import Field from "components/Input/Field";
import Picture from "components/Picture";
import React from "react";
import styles from "./AddInfo.module.css";

const AddInfo = ({ onSubmit }) => (
  <form onSubmit={onSubmit} className={styles.wrapper}>
    <Picture className={styles.picture} />
    <Field
      id="name"
      name="name"
      label="Name"
      className={styles.name}
      required
    />
    <Field
      id="email"
      name="email"
      label="Email"
      type="email"
      className={styles.email}
    />
    <Button type="submit" value="Submit" className={styles.next} />
  </form>
);

export default AddInfo;
