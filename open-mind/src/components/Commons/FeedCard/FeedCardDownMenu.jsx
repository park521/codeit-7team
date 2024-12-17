import React from "react";
import styled from "styled-components";
import Badge from "../Badge/Badge";
import { formatDate } from "../../../utils/formatData";

const FeedQuestion = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const FeedQuestionTime = styled.div`
  font-weight: 500;
  font-size: 0.875rem;
  color: var(--gray40-color);
`;

const FeedQuestionTitle = styled.div`
  font-family: "Actor";
  font-weight: 400;
  font-size: 1.125rem;
  color: var(--gray60-color);

  @media screen and (min-width: 375px) and (max-width: 767px) {
    font-size: 1rem;
  }
`;

function FeedCardDownMenu({ question }) {
  return (
    <>
      <Badge answer={question.answer} />
      <FeedQuestion>
        <FeedQuestionTime>
          질문 · {formatDate(question.createdAt)}
        </FeedQuestionTime>
        <FeedQuestionTitle>{question.content}</FeedQuestionTitle>
      </FeedQuestion>
    </>
  );
}

export default FeedCardDownMenu;
