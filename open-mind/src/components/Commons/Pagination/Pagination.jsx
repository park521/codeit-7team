import React from "react";
import styles from "./pagination.module.css";

function Pagination({ currentPage, totalPages, onPageChange, groupSize = 5 }) {
  const currentGroup = Math.ceil(currentPage / groupSize);
  const groupStart = (currentGroup - 1) * groupSize + 1;
  const groupEnd = Math.min(groupStart + groupSize - 1, totalPages);

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <div className={styles.pagination}>
      {/* 이전 페이지 버튼 */}
      <button
        onClick={() => !isPrevDisabled && onPageChange(currentPage - 1)}
        disabled={isPrevDisabled}
        className={`${styles.pagination_prev_btn} ${
          isPrevDisabled ? styles.disabled : ""
        }`}
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
        onClick={() => !isNextDisabled && onPageChange(currentPage + 1)}
        disabled={isNextDisabled}
        className={`${styles.pagination_next_btn} ${
          isNextDisabled ? styles.disabled : ""
        }`}
      >
        {">"}
      </button>
    </div>
  );
}

export default Pagination;
