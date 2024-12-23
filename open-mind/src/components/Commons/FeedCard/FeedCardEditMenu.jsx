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
  question,
  handleEditingClick,
  handleDeleteQuestion,
  setIsReject,
}) {
  const location = useLocation();
  const isAnswerPage = location.pathname.includes("answer");

  // 드롭다운 메뉴
  const values = [
    { value: "수정하기" },
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
      setIsReject((prevState) => !prevState);
    }
  }
  return (
    <EditMenu>
      <Badge answer={question.answer} />
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
