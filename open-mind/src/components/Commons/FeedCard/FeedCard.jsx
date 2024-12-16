import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSubjects } from "../../../api/subjectApi/subjectApi";
import { getQuestionsList } from "../../../api/questionApi/questionApi";
import FeedCardAnswer from "./FeedCardAnswer";
import FeedCardDownMenu from "./FeedCardDownMenu";
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
  useEffect(() => {
    async function fetchSubjectList() {
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
    }

    fetchSubjectList();
  }, [subjectId]);

  return (
    <div>
      {questions.map((question) => {
        return (
          <FeedCardBox key={question.id}>
            <FeedCardDownMenu question={question} />
            <FeedCardAnswer
              answer={question.answer}
              subject={subject}
            ></FeedCardAnswer>
            <FeedCardReaction like={question.like} dislike={question.dislike} />
          </FeedCardBox>
        );
      })}
    </div>
  );
}

export default FeedCard;
