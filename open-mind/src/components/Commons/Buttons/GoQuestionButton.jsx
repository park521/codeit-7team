import styles from "./button.module.css";
import arrow_right_icon from "../../../assets/icon/button-box-arrow-right-brown.svg";

function GoQuestionButton({ button_word }) {
  return (
    <button className={styles.go_question_button}>
      {button_word}
      <img src={arrow_right_icon} width="18px" alt="오른쪽 화살표" />
    </button>
  );
}

export default GoQuestionButton;
