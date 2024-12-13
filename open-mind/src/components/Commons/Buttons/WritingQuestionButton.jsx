import styles from "./button.module.css";
import Modal from "../Modal/Modal";
import { useState } from "react";

// 모달창 구현을 위한 질문 작성하기 버튼 모달창 이벤트 적용

function WritingQuestionButton({ button_word }) {
  const [modal, setModal] = useState(false);

  const handleButtonClick = () => {
    // modal 상태를 변경
    setModal(true);
  };

  return (
    <div>
      {/* 버튼 클릭 시 handleButtonClick 함수 호출 */}
      <button
        className={styles.writing_question_button}
        onClick={handleButtonClick}
      >
        {button_word}
      </button>

      {/* modal이 true일 때만 Modal 컴포넌트 렌더링 */}
      {/* state를 Modal에 props로 전달 */}
      {modal ? <Modal openModal={modal} setOpenModal={setModal} /> : null}
    </div>
  );
}

export default WritingQuestionButton;
