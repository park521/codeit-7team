import styles from "./button.module.css";
import rightArrow from "../../../assets/icon/button-box-arrow-right-brown.svg";
function DefaultButton({ innerText, hasArrow, onClick, disabled }) {
  const getButtonStyle = () => {
    if (innerText === "질문 받기") return styles.take_question_button;
    if (innerText === "답변 완료") return styles.answer_completed_button;
    if (innerText === "수정 완료") return styles.answer_completed_button;
    if (innerText === "답변하러 가기") return styles.go_question_button;
    if (innerText === "질문하러 가기") return styles.go_question_button;
    if (innerText === "질문 작성하기") return styles.writing_question_button;
    if (innerText === "질문 작성") return styles.writing_question_button;
    if (innerText === "삭제하기") return styles.delete_button;
  };

  return (
    <button
      className={`${getButtonStyle()} ${disabled ? styles.disabled : ""}`}
      onClick={disabled ? null : onClick}
      disabled={disabled}
    >
      {innerText}
      {hasArrow ? (
        <img
          src={rightArrow}
          className={styles.right_arrow}
          alt="오른쪽 화살표"
          width="18px"
        />
      ) : (
        " "
      )}
    </button>
  );
}

export default DefaultButton;
