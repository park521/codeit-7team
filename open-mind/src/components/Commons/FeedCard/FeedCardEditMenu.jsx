import React from "react";
import Badge from "../Badge/Badge";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const EditMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function FeedCardEditMenu({
  question,
  handleEditingClick,
  handleDeleteQuestion,
}) {
  const location = useLocation();
  const isAnswerPage = location.pathname.includes("answer");
  return (
    <EditMenu>
      <Badge answer={question.answer} />
      {isAnswerPage && (
        <>
          <button onClick={handleDeleteQuestion}>삭제</button>
          <button onClick={handleEditingClick}>...</button>
        </>
      )}
    </EditMenu>
  );
}

export default FeedCardEditMenu;
