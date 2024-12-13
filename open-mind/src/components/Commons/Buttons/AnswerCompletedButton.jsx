import styles from "./button.module.css";

function AnswerCompletedButton({ button_word }) {
  return (
    <button className={styles.answer_completed_button}>{button_word}</button>
  );
}

export default AnswerCompletedButton;
