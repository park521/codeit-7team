import styles from "./button.module.css";

function WritingQuestionButton({ button_word }) {
  return (
    <button className={styles.writing_question_button}>{button_word}</button>
  );
}

export default WritingQuestionButton;
