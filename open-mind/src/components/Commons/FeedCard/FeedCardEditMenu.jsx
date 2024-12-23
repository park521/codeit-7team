import React from "react";
import Badge from "../Badge/Badge";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Dropdown from "../Dropdown/Dropdown";
import More from "../../../assets/icon/more.svg";

const EditMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function FeedCardEditMenu({
  answer,
  question,
  handleEditingClick,
  handleDeleteQuestion,
  postAnswers,
  patchAnswers,
}) {
  const location = useLocation();
  const isAnswerPage = location.pathname.includes("answer");

  const handleRefusal = async () => {
    try {
      if (!answer) {
        const formData = {
          team: "12-7",
          content: "임시 답변",
          isRejected: false,
          questionId: question.id,
        };
        await postAnswers(question.id, formData);
        return;
      }
      if (answer.isRejected) {
        // Answer가 존재하고, isRejected가 true일 때
        const formData = {
          isRejected: false,
          answerId: answer.id,
        };
        await patchAnswers(answer.id, formData);
      } else {
        // Answer가 존재하고, isRejected가 false일 때
        const formData = {
          isRejected: true,
          answerId: answer.id,
        };
        await patchAnswers(answer.id, formData);
      }
    } catch (error) {
      console.error("Error during handleRefusal API call:", error);
    }
  };

  // 드롭다운 메뉴
  const values = [
    { value: "수정하기", isDisabled: !answer },
    { value: "삭제하기" },
    { value: "거절하기" },
  ];

  // 드롭다운 핸들러
  function handleDropdownChange(selectedValue) {
    if (selectedValue === "수정하기") {
      handleEditingClick();
    }
    if (selectedValue === "삭제하기") {
      handleDeleteQuestion();
    }
    if (selectedValue === "거절하기") {
      handleRefusal();
    }
  }
  return (
    <EditMenu>
      <Badge answer={answer} />
      {isAnswerPage && (
        <>
          <Dropdown
            values={values}
            isImageButton="true"
            imageButtonSrc={More}
            imageButtonAlt="드롭다운 버튼 이미지"
            onChange={handleDropdownChange}
          />
        </>
      )}
    </EditMenu>
  );
}

export default FeedCardEditMenu;
