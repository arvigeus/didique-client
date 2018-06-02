import Pages from "pages";
import React from "react";
import styles from "./App.module.css";
import Header from "./Header";
import { PopupContext } from "components/Popup";
import cx from "classnames";

class App extends React.Component {
  state = {
    popup: null
  };

  showPopup = popup => {
    this.setState({ popup });
  };

  render() {
    return (
      <PopupContext.Provider value={this.showPopup}>
        <div className={cx(styles.app, { [styles.blur]: !!this.state.popup })}>
          <Header />
          <main className={styles.paper}>
            <Pages />
          </main>
        </div>
        {this.state.popup}
      </PopupContext.Provider>
    );
  }
}

export default App;
