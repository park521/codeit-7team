import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSubjectsList } from "../../../api/subject/subject.js";
import styles from "./userCard.module.css";
import Messages from "../../../assets/icon/messages-gray.svg";
import Pagination from "../Pagination/Pagination.jsx";

function UserCard({ sortType = "최신순", searchQuery }) {
  const [allSubjects, setAllSubjects] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);

  // 화면 크기 변화 감지 (반응형)
  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth < 875 ? 6 : 8);
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  // 전체 데이터를 가져오기 (검색 기능용 데이터)
  useEffect(() => {
    if (searchQuery && !isAllDataLoaded) {
      const fetchAllSubjects = async () => {
        setLoading(true);
        try {
          const data = await getSubjectsList({ limit: 1000, sort: "name" });
          setAllSubjects(data.results || []);
          setIsAllDataLoaded(true);
        } catch (error) {
          console.error("검색 기능 에러:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchAllSubjects();
    }
  }, [searchQuery, isAllDataLoaded]);

  // 현재 페이지 데이터를 가져오기 (페이지네이션&정렬)
  useEffect(() => {
    if (!searchQuery) {
      const fetchPageSubjects = async () => {
        setLoading(true);
        try {
          const offset = (currentPage - 1) * itemsPerPage;
          const sortParam = sortType === "최신순" ? "time" : "name";
          const data = await getSubjectsList({
            limit: itemsPerPage,
            offset,
            sort: sortParam,
          });

          setSubjects(data.results || []);
          setTotalPages(Math.ceil(data.count / itemsPerPage));
        } catch (error) {
          console.error("페이지네이션&정렬 기능 에러:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchPageSubjects();
    }
  }, [currentPage, sortType, itemsPerPage, searchQuery]);

  // 검색 필터
  const filteredSubjects = searchQuery
    ? allSubjects.filter((subject) =>
        subject.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : subjects;

  if (loading) {
    return <p className={styles.loading}>Loading...</p>;
  }

  if (!filteredSubjects.length) {
    return <p className={styles.noData}>해당 유저 정보가 없습니다.</p>;
  }

  return (
    <div className={styles.grid_container}>
      <div className={styles.user_card_grid}>
        {filteredSubjects.map((subject) => (
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

      {/* 페이지네이션 */}
      {!searchQuery && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          groupSize={5}
        />
      )}
    </div>
  );
}

export default UserCard;
