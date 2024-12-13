import React from "react";
import styled from "styled-components";

const AnswerCompleteBadge = styled.p`
  padding: 4px;
  text-align: center;
  width: 76px;
  height: 26px;
  border: solid 1px;
  border-radius: 8px;
  border-color: #542f1a;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: #542f1a;
`;

const NoAnswerBadge = styled.p`
  width: 61px;
  text-align: center;
  height: 26px;
  padding: 4px;
  border: solid 1px;
  border-radius: 8px;
  border-color: #818181;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: #818181;
`;

function Badge({ answer }) {
  return (
    <div>
      {answer ? (
        <AnswerCompleteBadge>답변완료</AnswerCompleteBadge>
      ) : (
        <NoAnswerBadge>미답변</NoAnswerBadge>
      )}
    </div>
  );
}

export default Badge;
