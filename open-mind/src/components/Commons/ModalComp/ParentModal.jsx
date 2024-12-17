// 버튼 클릭하면 모달 페이지가 생성되는 부모 컴포넌트
// 개별 피드에서 질문 작성하기 버튼을 클릭하면 모달 페이지가 생성됨
import { useState } from "react";
import Modal from "./Modal";

export default function ParentModal() {
  const [isModal, setIsModal] = useState(false);
  const [questionId, setQuestionId] = useState("");

  return (
    <div>
      <button onClick={() => setIsModal(true)}>모달 열기</button>
      {isModal && <Modal questionId={questionId} setIsModal={setIsModal} />}
    </div>
  );
}
