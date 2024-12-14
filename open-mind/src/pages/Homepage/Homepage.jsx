import React from "react";
import "./homepage.css";
import GoQuestionButton from "../../components/Commons/Buttons/GoQuestionButton";
import TakeQuestions from "../../components/Commons/Buttons/TakeQuestions";

const go_question_button = "질문하러 가기";
const take_question_button = "질문 받기";

function Homepage() {
  return (
    <div className="main">
      <div className="main__form">
        <GoQuestionButton button_word={go_question_button}></GoQuestionButton>
        <h1 className="main__form-logo">OPNE MIND 로고</h1>
        <div className="main__form-group">
          <input className="main__form-input" type="text" />
          <TakeQuestions button_word={take_question_button} />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
