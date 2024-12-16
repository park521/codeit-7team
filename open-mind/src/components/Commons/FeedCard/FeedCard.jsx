import React from "react";
import styles from "./feedCard.module.css";
import Badge from "../Badge/Badge";
import thumbsUpIconOn from "../../../assets/icon/thumbs-up-gray.svg";
import thumbsUpIconOff from "../../../assets/icon/thumbs-up-gray.svg";
import thumbsDownIconOn from "../../../assets/icon/thumbs-down-gray.svg";
import thumbsDownIconOff from "../../../assets/icon/thumbs-down-gray.svg";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSubjects } from "../../../api/subjectApi/subjectApi";
import { getQuestionsList } from "../../../api/questionApi/questionApi";
import { getAnswers, postAnswers } from "../../../api/answerApi/answerApi";
import FeedCardAnswer from "./FeedCardAnswer";

// 피드 카드 컴포넌트
function FeedCard() {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState([{}]);

  // 연-월-일 시간-분-초 Date 포맷
  function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
  }

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

  // Fetch Answer of Question
  useEffect(() => {
    async function fetchAnswer() {
      for (const question of questions) {
        const answer = question.answer; // question에서 answer객체 불러옴
        // answer객체가 존재하고 answer.id가 있으면
        if (answer && answer.id) {
          const answerId = answer.id; // answerId에 id지정

          try {
            const data = await getAnswers(answerId);
            if (data) {
              setAnswer(data); // data 안에 배열이 있을 경우
            } else {
              setAnswer([]); // data가 없으면 빈 배열 설정
            }
          } catch (error) {
            console.error("Error fetching answer:", error);
          }
        }
      }
    }

    fetchAnswer();
  }, [questions]);

  return (
    <div>
      {questions.map((question, index) => {
        // answer의 questionId와 현재 question.id가 같은지 확인
        const isMatchingAnswer = answer?.questionId === question.id;
        // 좋아요 개수 0이면 표기 x
        const setLike = () => {
          return question.like === 0 ? "" : question.like;
        };
        // 싫어요 개수 0이면 표기 x
        const setDisLike = () => {
          return question.dislike === 0 ? "" : question.dislike;
        };

        return (
          <section key={index} className={styles.feed_card}>
            <section className={styles.answer_boolean}>
              <Badge answer={question.answer} />
            </section>
            <section className={styles.feed_question}>
              <section className={styles.feed_time}>
                질문 · {formatDate(question.createdAt)}
              </section>
              <section className={styles.feed_question_title}>
                {question.content}
              </section>
            </section>
            {isMatchingAnswer && (
              <section className={styles.feed_answer}>
                <section>
                  <img
                    src={subject.imageSource}
                    className={styles.feed_profile_img}
                    alt="프로필 사진"
                    width="48px"
                  />
                </section>
                <section className={styles.feed_detail_container}>
                  <section className={styles.feed_detail}>
                    <section className={styles.feed_nickname}>
                      {subject.name}
                    </section>
                    <section className={styles.feed_time}>
                      {formatDate(answer.createdAt)}
                    </section>
                  </section>
                  <section className={styles.feed_content}>
                    {answer.content}
                  </section>
                </section>
              </section>
            )}
            <FeedCardAnswer answer={answer} subject={subject}></FeedCardAnswer>
            <section className={styles.feed_favorite}>
              <section className={styles.feed_like}>
                <img
                  src={thumbsUpIconOff}
                  alt="좋아요 아이콘"
                  className={styles.favorite_icon}
                />
                좋아요 {setLike()}
              </section>
              <section className={styles.feed_hate}>
                <img
                  src={thumbsDownIconOff}
                  alt="좋아요 아이콘"
                  className={styles.favorite_icon}
                />
                싫어요 {setDisLike()}
              </section>
            </section>
          </section>
        );
      })}
    </div>
  );
}

export default FeedCard;
