import styles from "./Stickman.module.scss";

export default function Stickman({ wrongGuesses }) {
  return (
    <div className={styles.container}>
      <div className={styles.topStand}></div>
      <div className={styles.bottomStand}></div>
      <div className={styles.rope}></div>
      {wrongGuesses > 0 && <div className={styles.head}></div>}
      {wrongGuesses > 1 && <div className={styles.body}></div>}
      {wrongGuesses > 2 && <div className={styles.leftArm}></div>}
      {wrongGuesses > 3 && <div className={styles.rightArm}></div>}
      {wrongGuesses > 4 && <div className={styles.leftLeg}></div>}
      {wrongGuesses > 5 && <div className={styles.rightLeg}></div>}
      {wrongGuesses > 5 && (
        <div className={styles.head}>
          <div className={styles.deadFace}>
            <span>X</span>
            <span>X</span>
          </div>
        </div>
      )}
    </div>
  );
}
