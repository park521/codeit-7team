// 버튼 클릭하면 모달 페이지가 생성되는 부모 컴포넌트
// 개별 피드에서 질문 작성하기 버튼을 클릭하면 모달 페이지가 생성됨
import { useState } from "react";
import Modal from "./Modal";
import DefaultButton from "../Buttons/DefaultButton";

export default function ParentModal({ innerText, subjectId }) {
  const [isModal, setIsModal] = useState(false);

  return (
    <div>
      <DefaultButton
        innerText={innerText}
        hasArrow={false}
        onClick={() => setIsModal(true)}
      />
      {isModal && <Modal subjectId={subjectId} setIsModal={setIsModal} />}
    </div>
  );
}
