import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import isAuthenticated from "lib/isAuthenticated";
import styles from "./Header.module.css";

const Header = () => (
  <header className={styles.header}>
    <NavLink to="/" activeClassName={styles.selected}>
      Home
    </NavLink>
    {isAuthenticated() ? (
      <Fragment>
        <NavLink to="/about" activeClassName={styles.selected}>
          About
        </NavLink>
        <Link to="/signout">Sign out</Link>
      </Fragment>
    ) : (
      <NavLink to="/sign-in" activeClassName={styles.selected}>
        Sign In
      </NavLink>
    )}
  </header>
);
export default Header;