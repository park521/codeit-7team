import styles from "./button.module.css";

function TakeQuestions({ button_word }) {
  return <button className={styles.take_question_button}>{button_word}</button>;
}

export default TakeQuestions;
