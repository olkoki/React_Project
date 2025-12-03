import React, { useState } from "react";
import styles from "./Popup.module.scss";
import stickmanSign from "./stickmanSign.png";
function Popup() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div className={styles.overlay} />
      <div className={styles.popup} onClick={handleClose}>
        <div className={styles.popupInner} onClick={handleClose}>
          <h1>Welcome to Hangman!</h1>
          <img
            src={stickmanSign}
            alt="stickman holding a start sign"
            className={styles.stickman}
          ></img>
          <p className={styles.signature}>
            Made by Angela, Mariana, Matea and Ola
          </p>
        </div>
      </div>
    </>
  );
}

export default Popup;
