import React from "react";
import styled from "styled-components";
import { formatDate } from "../../../utils/formatData";
import { useLocation } from "react-router-dom";

const FeedAnswerContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
`;

const ProfileImage = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
`;

const FeedAnswerDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const FeedAnswerDetail = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

const FeedAnswerUserName = styled.p`
  font-family: "Actor";
  font-weight: 400;
  font-size: 1.125rem;
  color: var(--gray60-color);
`;

const FeedAnswerCreatedAt = styled.p`
  font-weight: 500;
  font-size: 0.875rem;
  color: var(--gray40-color);
`;

const FeedAnswerContent = styled.p`
  font-family: Pretendard;
  width: 35rem;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.375rem;
  color: var(--gray60-color);
`;

const TextArea = styled.textarea`
  width: 560px;
  height: 186px;
  padding: 16px;
  border-radius: 8px;
  background-color: var(--gray20-color);
`;
const Button = styled.button`
  width: 560px;
  height: 46px;
  padding: 12px 24px;
  border-radius: 8px;
`;

// 피드 답변
function FeedCardAnswer({ answer, subject }) {
  const location = useLocation();

  // URL에 'answer'가 포함되어 있는지 확인
  const isAnswerPage = location.pathname.includes("answer");

  // URL에 'answer'와 데이터 검사
  if (!isAnswerPage && !answer) {
    return;
  }

  return (
    <FeedAnswerContainer>
      <div>
        <ProfileImage src={subject.imageSource} alt="프로필 사진" />
      </div>
      <FeedAnswerDetailContainer>
        <FeedAnswerDetail>
          <FeedAnswerUserName>{subject.name}</FeedAnswerUserName>
          {answer && (
            <FeedAnswerCreatedAt>
              {formatDate(answer.createdAt)}
            </FeedAnswerCreatedAt>
          )}
        </FeedAnswerDetail>
        {answer && <FeedAnswerContent>{answer.content}</FeedAnswerContent>}
        {isAnswerPage && !answer && (
          <form>
            <TextArea></TextArea>
            <Button>답변 완료</Button>
          </form>
        )}
      </FeedAnswerDetailContainer>
    </FeedAnswerContainer>
  );
}

export default FeedCardAnswer;
