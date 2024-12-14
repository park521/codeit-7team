import React from "react";
import styles from "./modal.module.css";

// TODO
// 모달창 기본 여닫는 것 구현 완료
// 삼항 연산자
// 세부 모달창 디자인 및 기능 구현 요함

function Modal({ openModal, setOpenModal }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal_container}></div>
      <button
        className={styles.exit_button}
        onClick={() => {
          setOpenModal(false); // 모달창 닫기
        }}
      >
        X
      </button>
      {!openModal ? setOpenModal(true) : null}
    </div>
  );
}

export default Modal;
