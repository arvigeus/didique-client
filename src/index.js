import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import "components/Input/styles.css";

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_SERVER_URL}/graphql`
});

const ApolloApp = AppComponent => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <AppComponent />
    </BrowserRouter>
  </ApolloProvider>
);

ReactDOM.render(ApolloApp(App), document.getElementById("root"));
registerServiceWorker();
