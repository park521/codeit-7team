import React, { useState } from "react";
import UserCard from "../../components/commons/UserCard/UserCard";
import styles from "./questionListPage.module.css";
import Logo from "../../assets/logo/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "../../components/commons/Dropdown/Dropdown";
import ArrowDownGrayIcon from "../../assets/icon/arrow-down-gray.svg";
import ArrowDownDarkIcon from "../../assets/icon/arrow-down.svg";
import ArrowUpDarkIcon from "../../assets/icon/arrow-up.svg";
import DefaultButton from "../../components/commons/Buttons/DefaultButton";
import InputField from "../../components/commons/Input/InputField";

function QuestionListPage() {
  const [sortType, setSortType] = useState("최신순");
  const navigate = useNavigate();
  const values = [{ value: "최신순" }, { value: "이름순" }];
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearchChange(value) {
    setSearchQuery(value);
  }

  function handleDropdownChange(selectedValue) {
    setSortType(selectedValue);
  }

  const handleGoAnswer = (e) => {
    e.preventDefault();
    const subjectId = localStorage.getItem("id");

    if (subjectId) {
      navigate(`/post/${subjectId}/answer`); // ID가 있으면 이동
    } else {
      alert("메인 페이지에서 이름을 입력해주세요.");
      navigate("/"); // ID가 없으면 메인 페이지로 이동
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <header className={styles.header}>
          <Link to={"/"}>
            <img src={Logo} alt="로고 이미지" className={styles.header_logo} />
          </Link>
          <div className={styles.header_space}></div>
          <DefaultButton
            innerText="답변하러 가기"
            hasArrow="true"
            onClick={handleGoAnswer}
          />
        </header>
        <div className={styles.body}>
          <div className={styles.body_top_banner}>
            <h1 className={styles.body_top_banner_text}>
              누구에게 질문할까요?
            </h1>
            <Dropdown
              values={values}
              defaultValue="최신순"
              onChange={handleDropdownChange}
              iconDefault={ArrowDownGrayIcon}
              iconHover={ArrowDownDarkIcon}
              iconActive={ArrowUpDarkIcon}
            />
          </div>
          <UserCard sortType={sortType} searchQuery={searchQuery} />
        </div>
        <div className={styles.search_input_container}>
          <div className={styles.search_input}>
            <InputField
              placeholder="유저 이름을 검색하세요"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionListPage;
