import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

// Pass your GraphQL endpoint to uri
const client = new ApolloClient({
  uri: `${process.env.REACT_APP_SERVER_URL}/graphql`
});

const ApolloApp = AppComponent => (
  <ApolloProvider client={client}>
    <AppComponent />
  </ApolloProvider>
);

ReactDOM.render(ApolloApp(App), document.getElementById("root"));
registerServiceWorker();
