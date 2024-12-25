import React from "react";
import styles from "./feed.module.css";
import logo from "../../assets/logo/logo.svg";
import LinkItem from "../../components/commons/LinkItem/LinkItem";
import messagesIcon from "../../assets/icon/messages-brown.svg";
import Toast from "../../components/commons/Toast/Toast";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { getSubjects, deleteSubjects } from "../../api/subject/subject";
import { getQuestionsList, postQuestions } from "../../api/question/question";
import FeedCard from "../../components/commons/FeedCard/FeedCard";
import FeedCardEmpty from "../../components/commons/FeedCard/FeedCardEmpty";
import Modal from "../../components/commons/Modal/Modal";
import DefaultButton from "../../components/commons/Button/Button";

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
  const [questions, setQuestions] = useState([]); // 질문 리스트 상태 추가
  const [toastVisible, setToastVisible] = useState(false); // 토스트 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const isAnswerPage = location.pathname.match(/^\/post\/\d+\/answer$/);
  const navigate = useNavigate();

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
    async function fetchSubjectAndQuestions() {
      try {
        const subjectData = await getSubjects(subjectId);
        // console.log("Fetched data:", subjectData);
        if (subjectData) {
          setSubject(subjectData);

          const limit = subjectData.questionCount;
          // 질문 리스트 가져오기
          const questionsData = await getQuestionsList(subjectId, {
            limit: limit,
            offset: 0,
          });
          setQuestions(questionsData.results || []); // 질문 데이터 업데이트
        } else {
          setSubject(null);
          setQuestions([]);
        }
      } catch (error) {
        console.error("Error fetching subject or questions:", error);
      }
    }

    fetchSubjectAndQuestions();
  }, [subjectId]);

  // 링크 복사 후 토스트 표시
  const handleCopyToast = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 5000); // 5초 후 토스트 숨김
  };

  const addQuestion = async (subjectId, formData) => {
    try {
      const newQuestion = await postQuestions(subjectId, formData);
      setQuestions((prev) => [newQuestion, ...prev]);

      // 업데이트된 questionCount 값에 따라 main 클래스 변경
      setSubject((prev) => ({
        ...prev,
        questionCount: prev.questionCount + 1, // 질문 수 증가
      }));
    } catch (error) {
      console.error("Error submitting post questions:", error);
    }
  };

  // 삭제 기능
  const handleDeleteSubject = async () => {
    const result = await deleteSubjects(subjectId);
    if (!result) return;
    navigate("/");
  };

  const handleDeleteClick = (e) => {
    if (window.confirm("삭제하시겠습니까?")) {
      handleDeleteSubject();
      localStorage.removeItem("id");
      alert("삭제가 완료되었습니다.");
    } else {
      alert("취소되었습니다.");
      e.preventDefault();
    }
  };

  const handleDelete = () => {
    setSubject((prev) => ({
      ...prev,
      questionCount: 0, // 질문이 없으므로 0으로 설정
    }));
  };

  if (!subject) {
    return <div>Loading...</div>; // subject 데이터가 없으면 로딩 화면 표시
  }

  return (
    <div className={styles.body_contanier}>
      {/* 페이스북 공유 메타 태그 추가 (subject 데이터가 있을 때만 설정) */}
      <Helmet>
        <meta property="og:title" content={subject.name} />
        <meta
          property="og:description"
          content="질문을 작성하고 답변을 받아보세요!"
        />
        <meta property="og:image" content={subject.imageSource} />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
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
            <LinkItem onCopy={handleCopyToast} subject={subject} />{" "}
            {/* onCopy 전달 */}
          </section>
        </section>
      </header>
      <main
        className={subject.questionCount > 0 ? styles.main : styles.empty_main}
      >
        {/* 삭제하기 버튼 */}
        {isAnswerPage && (
          <section className={styles.delete_Feed}>
            <Link to="/">
              <DefaultButton
                innerText={"삭제하기"}
                hasArrow={false}
                onClick={handleDeleteClick}
              />
            </Link>
          </section>
        )}
        <section className={styles.question_header}>
          <section>
            <img
              src={messagesIcon}
              className={styles.messages_icon}
              alt="메시지 아이콘"
            />
          </section>
          <section className={styles.question_header_text}>
            {questions.length > 0
              ? `${questions.length}개의 질문이 있습니다`
              : "아직 질문이 없습니다"}
          </section>
        </section>
        <section className={styles.feed_list}>
          {questions && questions.length > 0 ? (
            <FeedCard
              questions={questions}
              onUpdateQuestions={setQuestions}
              onDelete={handleDelete}
            />
          ) : (
            <FeedCardEmpty />
          )}
        </section>
      </main>

      {/* 토스트 메시지 */}
      {toastVisible && (
        <div className={styles.toast_container}>
          <Toast />
        </div>
      )}

      {/* 질문 작성 버튼 */}
      {isAnswerPage ? (
        <section className={styles.no_question}>
          {/* 답변 페이지일 때 다른 클래스 적용 */}
        </section>
      ) : (
        <section className={styles.writing_question}>
          <DefaultButton
            innerText={innerText}
            hasArrow={false}
            onClick={() => setIsModalOpen(true)}
          />
        </section>
      )}

      {/* 모달 */}
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
