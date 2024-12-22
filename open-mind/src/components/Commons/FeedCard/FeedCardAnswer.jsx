import React from "react";
import styled from "styled-components";
import { formatDate } from "../../../utils/formatData";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import DefaultButton from "../Buttons/DefaultButton";

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

  @media screen and (min-width: 375px) and (max-width: 767px) {
    width: 2rem;
    height: 2rem;
  }
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

  @media screen and (min-width: 375px) and (max-width: 767px) {
    font-size: 0.875rem;
  }
`;

const FeedAnswerCreatedAt = styled.p`
  font-weight: 500;
  font-size: 0.875rem;
  color: var(--gray40-color);

  @media screen and (min-width: 375px) and (max-width: 767px) {
    font-size: 0.875rem;
  }
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

// 여기서부터 코드//
const INITIAL_VALUES = {
  content: "",
  isRejected: true,
  team: "12-7",
};

// 피드 답변
function FeedCardAnswer({
  answer,
  subject,
  postAnswers,
  putAnswers,
  questionId,
  isEditing,
<<<<<<< HEAD
  isReject,
=======
>>>>>>> bf4a22a672fe3b539f2ecc2427652ab13144f844
  initialValues = INITIAL_VALUES,
}) {
  const [values, setValues] = useState(initialValues);

  const location = useLocation();

  const handlePost = async (e) => {
    e.preventDefault();
    const formData = {
      ...values,
    };
    formData.content = values.content;
    formData.questionId = questionId;
    let result;
    try {
      result = await postAnswers(questionId, formData);
    } catch (error) {
      console.error("Error submitting post answer:", error);
    }
  };

  const handlePut = async (e) => {
    e.preventDefault();
    const formData = {
      ...values,
    };
    formData.content = values.content;
    formData.answerId = answer.id;
    let result;
    try {
      result = await putAnswers(answer.id, formData);
    } catch (error) {
      console.error("Error submitting put answer:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

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
        {answer && !isEditing && (
          <FeedAnswerContent>{answer.content}</FeedAnswerContent>
        )}
        {isAnswerPage && !answer && (
          <form onSubmit={handlePost}>
            <TextArea
              name="content"
              value={values.content}
              onChange={handleChange}
            ></TextArea>
            <DefaultButton
              innerText="답변 완료"
              type="submit"
              disabled={!values.content.trim()}
            />
          </form>
        )}
        {isAnswerPage && answer && isEditing && (
          <form onSubmit={handlePut}>
            <TextArea
              name="content"
              value={values.content}
              onChange={handleChange}
            ></TextArea>
            <DefaultButton
              innerText="수정 완료"
              type="submit"
              disabled={!values.content.trim()}
            />
<<<<<<< HEAD
          </form>
        )}
        {isAnswerPage && answer && isReject && (
          <form>
            <p>답변 거절</p>
=======
>>>>>>> bf4a22a672fe3b539f2ecc2427652ab13144f844
          </form>
        )}
      </FeedAnswerDetailContainer>
    </FeedAnswerContainer>
  );
}

export default FeedCardAnswer;
