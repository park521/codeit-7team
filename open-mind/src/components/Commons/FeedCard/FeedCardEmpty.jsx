import React from "react";
import styles from "./feedCard.module.css";
import emptyImg from "../../../assets/img/image3.svg";

// 빈 피드 카드 컴포넌트
function FeedCardEmpty() {
  return (
    <div>
      <section className={styles.question_empty}>
        <img
          src={emptyImg}
          className={styles.empty_img}
          alt="아직 질문이 없습니다"
        />
      </section>
    </div>
  );
}

export default FeedCardEmpty;
