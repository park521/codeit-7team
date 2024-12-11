import styles from "./button.module.css";

function GoQuestionButton({ button_word }) {
  return <button className={styles.go_question_button}>{button_word}</button>;
}

export default GoQuestionButton;
