import React, { useEffect, useState } from "react";
import { getSubjectsList } from "../../../api/subjectApi/subjectApi.js";
import styles from "./userCard.module.css";
import Messages from "../../../assets/icon/messages-gray.svg";

function UserCard({ sortType = "최신순" }) {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // totalPages 상태 추가
  const itemsPerPage = 8; // 한 페이지당 항목 수

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const offset = (currentPage - 1) * itemsPerPage;
        const sortParam = sortType === "최신순" ? "time" : "name"; // 정렬 기준 설정
        const data = await getSubjectsList({
          limit: itemsPerPage,
          offset,
          sort: sortParam,
        });

        setSubjects(data.results || []);
        setTotalPages(Math.ceil(data.count / itemsPerPage)); // 총 페이지 수 설정
      } catch (error) {
        console.error("Error fetching subjects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [currentPage, sortType]);

  // 페이지네이션 버튼 클릭 시
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (loading) {
    return <p className={styles.loading}>Loading...</p>;
  }

  if (!subjects.length) {
    return <p className={styles.noData}>유저 정보를 찾지 못했습니다.</p>;
  }

  return (
    <div>
      {/* 유저 카드 리스트 */}
      <div className={styles.user_card_grid}>
        {subjects.map((subject) => (
          <div key={subject.id} className={styles.user_card}>
            <div className={styles.user_card_container}>
              <img
                src={subject.imageSource}
                alt={subject.name}
                className={styles.user_image}
              />
              <h2 className={styles.user_name}>{subject.name}</h2>
              <div className={styles.question}>
                <div className={styles.question_text}>
                  <img
                    src={Messages}
                    alt="질문 아이콘"
                    className={styles.question_icon}
                  />
                  <p>받은 질문 </p>
                </div>
                <p>{subject.questionCount}개</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 버튼 */}
      <div className={styles.pagination}>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={styles.pagination_prev_btn}
        >
          {"<"}
        </button>

        {/* 페이지 번호 버튼 동적으로 생성 */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? styles.activePage : ""}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={styles.pagination_next_btn}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default UserCard;
