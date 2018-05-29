import isAuthenticated from "lib/isAuthenticated";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => (
  <header className={styles.header}>
    <NavLink to="/" activeClassName={styles.selected}>
      Home
    </NavLink>
    {isAuthenticated() ? (
      <NavLink to="/about" activeClassName={styles.selected}>
        About
      </NavLink>
    ) : null}
    <NavLink to="/contact-us" activeClassName={styles.selected}>
      Contact Us
    </NavLink>
    {isAuthenticated() ? (
      <Link to="/signout">Sign out</Link>
    ) : (
      <NavLink to="/sign-in" activeClassName={styles.selected}>
        Sign In
      </NavLink>
    )}
  </header>
);
export default Header;
