import React from "react";
import styles from "./pagination.module.css";

function Pagination({ currentPage, totalPages, onPageChange, groupSize = 5 }) {
  // 현재 페이지 그룹 계산
  const currentGroup = Math.ceil(currentPage / groupSize);
  const groupStart = (currentGroup - 1) * groupSize + 1; // 그룹 시작 페이지
  const groupEnd = Math.min(groupStart + groupSize - 1, totalPages); // 그룹 마지막 페이지

  return (
    <div className={styles.pagination}>
      {/* 이전 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.pagination_prev_btn}
      >
        {"<"}
      </button>

      {/* 페이지 번호 버튼 생성 */}
      {Array.from(
        { length: groupEnd - groupStart + 1 },
        (_, index) => groupStart + index
      ).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${styles.pageNum} ${
            currentPage === page ? styles.activePage : ""
          }`}
        >
          {page}
        </button>
      ))}

      {/* 다음 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages} // 마지막 페이지일 경우 비활성화
        className={styles.pagination_next_btn}
      >
        {">"}
      </button>
    </div>
  );
}

export default Pagination;
