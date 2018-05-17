import React from "react";
import Header from "./Header";
import styles from "./App.module.css";

const App = () => (
  <>
    <Header />
    <main className={styles.paper} />
  </>
);

export default App;
