import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import isAuthenticated from "../lib/isAuthenticated";
import About from "./About";
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
    <PrivateRoute
      path="/friend/:id"
      component={Friend}
      fallback={RedirectHome}
    />
  </Switch>
);
