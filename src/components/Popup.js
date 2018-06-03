// @flow
import Note from "components/Note";
import React from "react";
import styles from "./Popup.module.css";
import Button from "./Input/Button";

type PopupPropsType = {
  cancel: () => void,
  children: any
};

class Popup extends React.Component<PopupPropsType> {
  escFunction = (event: mixed) => {
    if (event instanceof KeyboardEvent && event.keyCode === 27) {
      this.props.cancel();
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  render() {
    const { cancel, children, ...props } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.overlay} onClick={cancel} />
        <Note className={styles.popup} cancel={cancel} {...props}>
          {children}
        </Note>
      </div>
    );
  }
}

export const PopupContext = React.createContext(() => {});

type ConfirmPopupPropsType = {
  ok: () => void,
  cancel: () => void,
  children: any
};

export const ConfirmPopup = ({
  ok,
  cancel,
  children
}: ConfirmPopupPropsType) => (
  <Popup cancel={cancel}>
    {children}
    <div className={styles.confirm}>
      <Button value="Yes" onClick={ok} />
      <Button value="No" onClick={cancel} />
    </div>
  </Popup>
);

export default Popup;
