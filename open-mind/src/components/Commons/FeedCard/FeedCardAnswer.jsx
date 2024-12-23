import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { formatDate } from "../../../utils/formatData";
import { useLocation } from "react-router-dom";
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

const commonFontStyle = `
  font-family: Pretendard, sans-serif;
  color: var(--gray60-color);
`;

const FeedAnswerUserName = styled.p`
  ${commonFontStyle}
  font-weight: 400;
  font-size: 1.125rem;

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
  ${commonFontStyle}
  font-size: 1rem;
  line-height: 1.375rem;
  width: 35rem;
  font-weight: 400;
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

const INITIAL_VALUES = {
  content: "",
  isRejected: true,
  team: "12-7",
};

function FeedCardAnswer({
  answer,
  subject,
  postAnswers,
  putAnswers,
  questionId,
  isEditing,
  initialValues = INITIAL_VALUES,
}) {
  const [values, setValues] = useState(() => ({
    ...INITIAL_VALUES,
    ...initialValues,
  }));

  const location = useLocation();
  const isAnswerPage = location.pathname.includes("answer");

  // 처음 렌더링 시 answer 값으로 상태 초기화
  useEffect(() => {
    if (answer && answer.content) {
      setValues((prevValues) => ({
        ...prevValues,
        content: answer.content,
      }));
    }
  }, [answer]);

  const handleChange = ({ target: { name, value } }) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value.trimStart(),
    }));
  };

  const validateForm = () => {
    if (!values.content.trim()) {
      alert("내용을 입력해주세요.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = {
      ...values,
      content: values.content,
      ...(type === "post" && { questionId }),
      ...(type === "put" && { answerId: answer.id }),
    };

    try {
      const action = type === "post" ? postAnswers : putAnswers;
      await action(type === "post" ? questionId : answer.id, formData);
      alert(`${type === "post" ? "답변이 등록" : "답변이 수정"}되었습니다.`);
    } catch (error) {
      console.error(`Error submitting ${type} answer:`, error);
      alert(`오류가 발생했습니다. 다시 시도해주세요.`);
    }
  };

  const renderForm = () => {
    if (isAnswerPage && !answer) {
      return (
        <form onSubmit={(e) => handleSubmit(e, "post")}>
          <TextArea
            name="content"
            value={values.content}
            onChange={handleChange}
          />
          <DefaultButton
            innerText="답변 완료"
            onClick={(e) => handleSubmit(e, "post")}
            disabled={!values.content.trim()}
          />
        </form>
      );
    }

    if (isAnswerPage && answer && isEditing) {
      return (
        <form onSubmit={(e) => handleSubmit(e, "put")}>
          <TextArea
            name="content"
            value={values.content}
            onChange={handleChange}
          />
          <DefaultButton
            innerText="수정 완료"
            onClick={(e) => handleSubmit(e, "put")}
            disabled={!values.content.trim()}
          />
        </form>
      );
    }
  };

  if (!isAnswerPage && !answer) {
    return null;
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
        {renderForm()}
      </FeedAnswerDetailContainer>
    </FeedAnswerContainer>
  );
}

export default FeedCardAnswer;
