import React from "react";
import styles from "./feed.module.css";
import logo from "../../assets/logo/logo.svg";
import LinkItem from "../../components/commons/Link/LinkItem";
import messagesIcon from "../../assets/icon/messages-brown.svg";
import Toast from "../../components/commons/Toast/Toast";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getSubjects } from "../../api/subjectApi/subjectApi";
import { postQuestions } from "../../api/questionApi/questionApi";
import FeedCard from "../../components/commons/FeedCard/FeedCard";
import FeedCardEmpty from "../../components/commons/FeedCard/FeedCardEmpty";
import Modal from "../../components/commons/Modal/Modal";
import DefaultButton from "../../components/commons/Buttons/DefaultButton";

const do_question_button = "질문 작성하기"; // desktop & tablet 버튼 텍스트
const do_question_button_mobile = "질문 작성"; // mobile 버튼 텍스트

// 개별 피드 페이지
function IndividualFeed() {
  // 화면 크기에 따라 버튼 텍스트 결정 함수
  const getInnerText = (width) => {
    return width <= 767 ? do_question_button_mobile : do_question_button;
  };
  const { subjectId } = useParams();
  const [subject, setSubject] = useState([]);
  const [innerText, setInnerText] = useState(getInnerText(window.innerWidth));
  const [toastVisible, setToastVisible] = useState(false); // 토스트 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setInnerText(getInnerText(window.innerWidth)); // 화면 크기 변경 시 상태 업데이트
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

  // 링크 복사 후 토스트 표시
  const handleCopyToast = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 5000); // 5초 후 토스트 숨김
  };

  const addQuestion = async (subjectId, formData) => {
    try {
      await postQuestions(subjectId, formData);
    } catch (error) {
      console.error("Error submitting post questions:", error);
    }
  };

  return (
    <div className={styles.body_contanier}>
      <header className={styles.header}>
        <section className={styles.header_background}>
          <section className={styles.header_logo}>
            <Link to="/">
              <img
                src={logo}
                className={styles.header_logo_img}
                alt="헤더 로고"
              />
            </Link>
          </section>
          <section className={styles.header_content}>
            <img
              src={subject.imageSource}
              className={styles.profile_img}
              alt="프로필 사진"
            />
            <section className={styles.nickname}>{subject.name}</section>
            <LinkItem onCopy={handleCopyToast} /> {/* onCopy 전달 */}
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

      {/* 토스트 메시지 */}
      {toastVisible && (
        <div className={styles.toast_container}>
          <Toast />
        </div>
      )}

      <section className={styles.writing_question}>
        <DefaultButton // 공통화 버튼 불러옴
          innerText={innerText}
          hasArrow={false}
          onClick={() => setIsModalOpen(true)}
        />
      </section>

      {isModalOpen && (
        <Modal
          subject={subject}
          setIsModal={setIsModalOpen}
          addQuestion={addQuestion}
        />
      )}
    </div>
  );
}

export default IndividualFeed;
