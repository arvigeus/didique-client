import React from "react";
import styles from "./App.module.css";
import Header from "./Header";

const App = () => (
  <>
    <Header />
    <main className={styles.paper} />
  </>
);

export default App;
