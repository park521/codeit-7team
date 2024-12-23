import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSubjectsList } from "../../../api/subjectApi/subjectApi.js";
import styles from "./userCard.module.css";
import Messages from "../../../assets/icon/messages-gray.svg";
import Pagination from "../Pagination/Pagination.jsx";

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

  if (loading) {
    return <p className={styles.loading}>Loading...</p>;
  }

  if (!subjects.length) {
    return <p className={styles.noData}>유저 정보를 찾지 못했습니다.</p>;
  }

  return (
    <div className={styles.grid_container}>
      {/* 유저 카드 리스트 */}
      <div className={styles.user_card_grid}>
        {subjects.map((subject) => (
          <div key={subject.id} className={styles.user_card}>
            <Link to={`/post/${subject.id}`} className={styles.subject_link}>
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
            </Link>
          </div>
        ))}
      </div>

      {/* 페이지네이션 컴포넌트 사용 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
        groupSize={5}
      />
    </div>
  );
}

export default UserCard;
