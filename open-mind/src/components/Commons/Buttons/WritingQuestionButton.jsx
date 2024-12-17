import styles from "./button.module.css";

function WritingQuestionButton({ button_word, onClick }) {
  return (
    <button className={styles.writing_question_button} onClick={onClick}>
      {button_word}
    </button>
  );
}

export default WritingQuestionButton;
