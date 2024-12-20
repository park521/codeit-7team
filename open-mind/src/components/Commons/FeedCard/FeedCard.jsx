import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSubjects } from "../../../api/subjectApi/subjectApi";
import {
  getQuestionsList,
  deleteQuestions,
} from "../../../api/questionApi/questionApi";
import { postAnswers, putAnswers } from "../../../api/answerApi/answerApi";
import FeedCardEditMenu from "./FeedCardEditMenu";
import FeedCardQuestion from "./FeedCardQuestion";
import FeedCardAnswer from "./FeedCardAnswer";
import FeedCardReaction from "./FeedCardReaction";

const FeedCardBox = styled.div`
  border-radius: 1rem;
  padding: 2rem;
  background-color: var(--gray10-color);
  box-shadow: var(--box-shadow-1pt);
  margin: 0 1rem 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;

  @media screen and (min-width: 375px) and (max-width: 767px) {
    gap: 1.5rem;
  }
`;

// 피드 카드 컴포넌트
function FeedCard() {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [editingState, setEditingState] = useState({});

  // Fetch Subject
  useEffect(() => {
    async function fetchSubject() {
      try {
        const data = await getSubjects(subjectId);
        if (data) {
          setSubject(data); // data 안에 배열이 있을 경우
        } else {
          setSubject([]); // data가가 없으면 빈 배열 설정
        }
      } catch (error) {
        console.error("Error fetching subject:", error);
      }
    }

    fetchSubject();
  }, [subjectId]);

  // Fetch Subject Question
  const fetchQuestionsList = async () => {
    try {
      const data = await getQuestionsList(subjectId, { limit: 5, offset: 0 });
      if (data) {
        setQuestions(data.results); // results 안에 배열이 있을 경우
      } else {
        setQuestions([]); // results가 없으면 빈 배열 설정
      }
    } catch (error) {
      console.error("Error fetching subjectList:", error);
    }
  };

  const handlePostAnswer = async (questionId, formData) => {
    try {
      await postAnswers(questionId, formData);
      fetchQuestionsList();
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      await deleteQuestions(questionId);
      fetchQuestionsList();
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  const handlePutAnswers = async (answerId, formData) => {
    try {
      await putAnswers(answerId, formData);
      setEditingState(false);
      fetchQuestionsList();
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  const handleEditingClick = (questionId) => {
    setEditingState((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  useEffect(() => {
    fetchQuestionsList();
  }, [subjectId]);

  return (
    <div>
      {questions.map((question) => {
        const isEditing = editingState[question.id] || false;
        return (
          <FeedCardBox key={question.id}>
            <FeedCardEditMenu
              question={question}
              handleEditingClick={() => handleEditingClick(question.id)}
              handleDeleteQuestion={() => handleDeleteQuestion(question.id)}
            />
            <FeedCardQuestion question={question} />
            <FeedCardAnswer
              answer={question.answer}
              subject={subject}
              questionId={question.id}
              postAnswers={handlePostAnswer}
              putAnswers={handlePutAnswers}
              isEditing={isEditing}
            ></FeedCardAnswer>
            <FeedCardReaction like={question.like} dislike={question.dislike} />
          </FeedCardBox>
        );
      })}
    </div>
  );
}

export default FeedCard;
