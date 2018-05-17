import ApolloClient from "apollo-boost";
import "components/Input/styles.css";
import App from "containers/App";
import React from "react";
import { ApolloProvider } from "react-apollo";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

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
