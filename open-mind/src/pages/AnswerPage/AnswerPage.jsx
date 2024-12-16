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

// 개별 피드 페이지
function IndividualFeed() {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState([]);

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
    </div>
  );
}

export default IndividualFeed;
