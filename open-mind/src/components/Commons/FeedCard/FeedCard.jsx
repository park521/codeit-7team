import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSubjects } from "../../../api/subjectApi/subjectApi";
import {
  getQuestionsList,
  deleteQuestions,
} from "../../../api/questionApi/questionApi";
import {
  postAnswers,
  putAnswers,
  patchAnswers,
} from "../../../api/answerApi/answerApi";
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
function FeedCard({ questions: parentQuestions, onUpdateQuestions, onDelete }) {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState([]);
  const [questions, setQuestions] = useState([]); // 질문 리스트 상태
  const [editingState, setEditingState] = useState({});

  // Fetch Subject
  useEffect(() => {
    async function fetchSubject() {
      try {
        const data = await getSubjects(subjectId);
        if (data) {
          setSubject(data); // data 안에 배열이 있을 경우
        } else {
          setSubject([]); // data가 없으면 빈 배열 설정
        }
      } catch (error) {
        console.error("Error fetching subject:", error);
      }
    }

    fetchSubject();
  }, [subjectId]);

  // Fetch Subject Question
  useEffect(() => {
    // parentQuestions가 존재하지 않으면 fetchQuestionsList 호출
    if (!parentQuestions || parentQuestions.length === 0) {
      fetchQuestionsList();
    } else {
      setQuestions(parentQuestions); // parentQuestions가 있으면 바로 사용
    }
  }, [subjectId, parentQuestions]);

  const fetchQuestionsList = async () => {
    try {
      const data = await getQuestionsList(subjectId, { limit: 5, offset: 0 });

      if (data) {
        // 데이터를 최신순으로 정렬 (내림차순)
        const sortedQuestions = data.results.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setQuestions(sortedQuestions); // 정렬된 결과 저장
        if (onUpdateQuestions) onUpdateQuestions(sortedQuestions);
      } else {
        setQuestions([]); // 결과가 없으면 빈 배열 설정
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
      // API를 통해 질문 삭제
      await deleteQuestions(questionId);

      // 삭제 후 상태에서 해당 질문을 필터링하여 제거
      const updatedQuestions = questions.filter(
        (question) => question.id !== questionId
      );
      onUpdateQuestions(updatedQuestions); // 상태 업데이트

      // 질문이 하나도 없으면 onDelete 호출
      if (updatedQuestions.length === 0) {
        onDelete(); // 질문 삭제 후 empty_main 클래스를 적용
      }
    } catch (error) {
      console.error("Error deleting question:", error);
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

  const handlePatchAnswers = async (answerId, formData) => {
    try {
      await patchAnswers(answerId, formData);
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

  return (
    <div>
      {questions.length > 0 ? (
        questions.map((question) => {
          const isEditing = editingState[question.id] || false;
          return (
            <FeedCardBox key={question.id}>
              <FeedCardEditMenu
                answer={question.answer}
                question={question}
                handleEditingClick={() => handleEditingClick(question.id)}
                handleDeleteQuestion={() => handleDeleteQuestion(question.id)}
                postAnswers={handlePostAnswer}
                patchAnswers={handlePatchAnswers}
              />
              <FeedCardQuestion question={question} />
              <FeedCardAnswer
                answer={question.answer}
                subject={subject}
                questionId={question.id}
                postAnswers={handlePostAnswer}
                putAnswers={handlePutAnswers}
                isEditing={isEditing}
              />
              <FeedCardReaction
                initialLike={question.like}
                initialDislike={question.dislike}
                questionId={question.id}
              />
            </FeedCardBox>
          );
        })
      ) : (
        <div>No questions available</div> // 질문이 없을 경우 표시할 메시지
      )}
    </div>
  );
}

export default FeedCard;
