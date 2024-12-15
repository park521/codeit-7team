import React, { useEffect, useState } from "react";
import { fetchAllSubjects } from "../../../api/userCardApi";
import "./userCard.css";
import Messages from "../../../assets/icon/messages-gray.svg";

function UserCard({ sortType }) {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // 한 페이지당 항목 수, 반응형 구현 시 코드 변경해야됨.

  useEffect(() => {
    const getSubjects = async () => {
      try {
        const data = await fetchAllSubjects();
        setSubjects(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getSubjects();
  }, []);

  // 정렬 함수
  const sortedSubjects = [...subjects].sort((a, b) => {
    if (sortType === "최신순") {
      return new Date(b.createdAt) - new Date(a.createdAt); // 최신순: 내림차순
    }
    if (sortType === "이름순") {
      return a.name.localeCompare(b.name); // 이름순: 오름차순
    }
    return 0;
  });

  // 페이지네이션: 현재 페이지에 해당하는 데이터만 추출
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedSubjects.slice(indexOfFirstItem, indexOfLastItem);

  // 총 페이지 수
  const totalPages = Math.ceil(subjects.length / itemsPerPage);

  // 페이지 변경 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 이전 페이지
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 다음 페이지
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!subjects.length) {
    return <p>유저 정보를 찾지 못했습니다.</p>;
  }

  return (
    <div>
      {/* 유저 카드 리스트 */}
      <div className="user-card-grid">
        {currentItems.map((subject) => (
          <div key={subject.id} className="user-card">
            <div className="user-card-container">
              <img
                src={subject.imageSource}
                alt={subject.name}
                className="user-image"
              />
              <h2 className="user-name">{subject.name}</h2>
              <div className="question">
                <div className="question-text">
                  <img
                    src={Messages}
                    alt="질문 아이콘"
                    className="question-icon"
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
      <div className="pagination">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="pagination-prev-btn"
        >
          {"<"}
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              disabled={pageNumber === currentPage}
              className="pagination-number-btn"
            >
              {pageNumber}
            </button>
          )
        )}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="pagination-next-btn"
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default UserCard;
