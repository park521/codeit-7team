import React from "react";
import styles from "./feed.module.css";
import logo from "../../assets/logo/logo.svg";
import LinkItem from "../../components/Commons/Link/LinkItem";
import messagesIcon from "../../assets/icon/messages-brown.svg";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSubjects } from "../../api/subjectApi/subjectApi";
import FeedCard from "../../components/Commons/FeedCard/FeedCard";
import FeedCardEmpty from "../../components/Commons/FeedCard/FeedCardEmpty";
import WritingQuestionButton from "../../components/Commons/Buttons/WritingQuestionButton";

const do_question_button = "질문 작성하기"; // desktop & tablet 버튼 텍스트
const do_question_button_mobile = "질문 작성"; // mobile 버튼 텍스트

// 개별 피드 페이지
function IndividualFeed() {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState([]);
  const [buttonWord, setButtonWord] = useState(
    getButtonWord(window.innerWidth)
  );

  // 화면 크기에 따라 버튼 텍스트 결정 함수
  function getButtonWord(width) {
    return width <= 767 ? do_question_button_mobile : do_question_button;
  }

  useEffect(() => {
    const handleResize = () => {
      setButtonWord(getButtonWord(window.innerWidth)); // 화면 크기 변경 시 상태 업데이트
    };

    window.addEventListener("resize", handleResize); // 이벤트 리스너 등록

    return () => {
      window.removeEventListener("resize", handleResize); // 컴포넌트 언마운트 시 리스너 제거
    };
  }, []);

  // Fetch Subject
  useEffect(() => {
    async function fetchSubject() {
      try {
        const data = await getSubjects(subjectId);
        if (data) {
          setSubject(data);
        } else {
          setSubject([]);
        }
      } catch (error) {
        console.error("Error fetching subject:", error);
      }
    }

    fetchSubject();
  }, [subjectId]);

  return (
    <div className={styles.body_contanier}>
      <header className={styles.header}>
        <section className={styles.header_background}>
          <section className={styles.header_logo}>
            <img
              src={logo}
              className={styles.header_logo_img}
              alt="헤더 로고"
            />
          </section>
          <section className={styles.header_content}>
            <img
              src={subject.imageSource}
              className={styles.profile_img}
              alt="프로필 사진"
            />
            <section className={styles.nickname}>{subject.name}</section>
            <LinkItem />
          </section>
        </section>
      </header>
      <main
        className={
          subject.questionCount !== 0 ? styles.main : styles.empty_main
        }
      >
        <section className={styles.question_header}>
          <section>
            <img
              src={messagesIcon}
              className={styles.messages_icon}
              alt="메시지 아이콘"
            />
          </section>
          <section className={styles.question_header_text}>
            {subject.questionCount !== 0
              ? `${subject.questionCount}개의 질문이 있습니다`
              : "아직 질문이 없습니다"}
          </section>
        </section>
        <section className={styles.feed_list}>
          {subject.questionCount !== 0 ? <FeedCard /> : <FeedCardEmpty />}
        </section>
      </main>
      <section className={styles.writing_question}>
        <WritingQuestionButton button_word={buttonWord} />
      </section>
    </div>
  );
}

export default IndividualFeed;
