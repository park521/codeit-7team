import React from "react";
import UserCard from "../../components/Commons/UserCard/UserCard";
import "./questionListPage.css";
import Logo from "../../assets/logo/logo.svg";
import GoQuestionButton from "../../components/Commons/Buttons/GoQuestionButton";
import { Link } from "react-router-dom";
import Dropdown from "../../components/Commons/Dropdown/Dropdown";

function QuestionListPage() {
  return (
    <div>
      <div className="container">
        <header className="header">
          <Link to={"/"}>
            <img src={Logo} alt="로고 이미지" className="header-logo" />
          </Link>
          <GoQuestionButton button_word="답변하러 가기" />
        </header>
        <body className="body">
          <div className="body-top-banner">
            <h1 className="body-top-banner-text">누구에게 질문할까요?</h1>
            <Dropdown />
          </div>
          <UserCard />
        </body>
        <div style={{ textAlign: "center" }}>{"<  1  2  3  4  5  >"}</div>
      </div>
    </div>
  );
}

export default QuestionListPage;
