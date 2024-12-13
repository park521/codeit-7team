import React from "react";
import styles from "./feed.module.css";
import logo from "../../assets/logo/logo.svg";
import profile from "../../assets/img/profile.svg";
import LinkItem from "../../components/Commons/Link/LinkItem";
import messagesIcon from "../../assets/icon/messages-brown.svg";

function IndividualFeed() {
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
              src={profile}
              className={styles.profile_img}
              alt="프로필 사진"
            />
            <div className={styles.nickname}>닉네임</div>
            <LinkItem />
          </section>
        </section>
      </header>
      <main className={styles.main}>
        <section className={styles.question_num}>
          <section>
            <img
              src={messagesIcon}
              className={styles.messages_icon}
              alt="메시지 아이콘"
            />
          </section>
          <section className={styles.question_num_text}>
            3{/* 변수 들어갈 자리리 */}개의 질문이 있습니다
          </section>
        </section>
        <section className={styles.feed_card}>
          <section className={styles.answer_boolean}>
            <section className={styles.answer_boolean_text}>답변 완료</section>
          </section>
          <section className={styles.feed_question}>2</section>
          <section className={styles.feed_answer}>3</section>
          <section className={styles.feed_favorite}>4</section>
        </section>
      </main>
    </div>
  );
}

export default IndividualFeed;
