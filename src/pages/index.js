import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import isAuthenticated from "../lib/isAuthenticated";
import About from "./About";
import ContactUs from "./ContactUs";
import Friend from "./Friend";
import Home from "./Home";
import SignIn from "./SignIn";

const PrivateRoute = ({
  component: Component,
  fallback: Fallback,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? <Component {...props} /> : <Fallback {...props} />
    }
  />
);

const RedirectHome = () => (
  <Redirect
    to={{
      pathname: "/"
    }}
  />
);

export default () => (
  <Switch>
    <PrivateRoute path="/" exact component={Home} fallback={About} />
    <PrivateRoute
      path="/about"
      exact
      component={About}
      fallback={RedirectHome}
    />
    {/* Sign in uses reverse logic - if not authenticated then display form, else redirect to home */}
    <PrivateRoute
      path="/sign-in"
      exact
      component={RedirectHome}
      fallback={SignIn}
    />
    <Route path="/contact-us" exact render={ContactUs} />
    <PrivateRoute
      path="/friend/:nickname"
      component={Friend}
      fallback={RedirectHome}
    />
  </Switch>
);
