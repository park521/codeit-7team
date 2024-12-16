import React, { useState } from "react";
import UserCard from "../../components/Commons/UserCard/UserCard";
import styles from "./questionListPage.module.css";
import Logo from "../../assets/logo/logo.svg";
import GoQuestionButton from "../../components/Commons/Buttons/GoQuestionButton";
import { Link } from "react-router-dom";
import Dropdown from "../../components/Commons/Dropdown/Dropdown";
import ArrowDownGrayIcon from "../../assets/icon/arrow-down-gray.svg";
import ArrowDownDarkIcon from "../../assets/icon/arrow-down.svg";
import ArrowUpDarkIcon from "../../assets/icon/arrow-up.svg";

function QuestionListPage() {
  const [sortType, setSortType] = useState("최신순");

  function handleDropdownChange(selectedValue) {
    setSortType(selectedValue);
  }

  return (
    <div>
      <div className={styles.container}>
        <header className={styles.header}>
          <Link to={"/"}>
            <img src={Logo} alt="로고 이미지" className={styles.header_logo} />
          </Link>
          <GoQuestionButton button_word="답변하러 가기" />
        </header>
        <body className={styles.body}>
          <div className={styles.body_top_banner}>
            <h1 className={styles.body_top_banner_text}>
              누구에게 질문할까요?
            </h1>
            <Dropdown
              values={["이름순", "최신순"]}
              defaultValue="최신순"
              onChange={handleDropdownChange}
              iconDefault={ArrowDownGrayIcon}
              iconHover={ArrowDownDarkIcon}
              iconActive={ArrowUpDarkIcon}
              iconPosition="back"
            />
          </div>
          <UserCard sortType={sortType} />
        </body>
      </div>
    </div>
  );
}

export default QuestionListPage;
