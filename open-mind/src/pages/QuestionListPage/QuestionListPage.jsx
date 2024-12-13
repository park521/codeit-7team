import React from "react";
import UserCard from "../../components/Commons/UserCard/UserCard";
import "./questionListPage.css";

function QuestionListPage() {
  return (
    <div>
      <header>
        <div>로고</div>
        <button>답변하러 가기</button>
      </header>
      <h1>누가에게 질문할까요?</h1>
      <div>드롭다운</div>
      <div>유저 카드 리스트</div>
      <UserCard />
    </div>
  );
}

export default QuestionListPage;
