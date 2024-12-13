import React from "react";
import styles from "./style.module.css";
import logo from "../../assets/logo/logo.svg";
import profile from "../../assets/img/profile.svg";
import LinkItem from "../../components/Commons/Link/LinkItem";

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
        <section>
          <section></section>
          <section></section>
        </section>
      </main>
    </div>
  );
}

export default IndividualFeed;
