import Button from "components/Input/Button";
import Field from "components/Input/Field";
import React from "react";
import styles from "./SignIn.module.css";

const SignIn = () => (
  <>
    <form className={styles.email}>
      <Field
        type="email"
        name="email"
        label="Enter your email to sign in or create an account"
      />
      <Button type="submit" value="Sign in" />
    </form>
    <span>OR</span>
    <Button className={styles.facebook}>Sign in with Facebook</Button>
  </>
);

export default SignIn;
