import React, { useState } from "react";
import styles from "./homepage.module.css";
import GoQuestionButton from "../../components/Commons/Buttons/GoQuestionButton";
import TakeQuestions from "../../components/Commons/Buttons/TakeQuestions";
import InputField from "../../components/Commons/InputField/InputField";
import { Link, useNavigate } from "react-router-dom";
import { handleCreateFeed } from "../../api/homepage/hompage";

const go_question_button = "질문하러 가기";
const take_question_button = "질문 받기";

function Homepage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (value) => {
    setName(value);
  };

  const handleClickChange = () => {
    handleCreateFeed(name, navigate);
  }


  return (
    <div className={styles.main}>
      <div className={styles.main__form}>
        <Link to={"/list"}>
          <GoQuestionButton button_word={go_question_button} />
        </Link>
        <h1 className={styles.main__form_logo}>OPNE MIND 로고</h1>
        <div className={styles.main__form_group}>
          <InputField value={name} onChange={handleInputChange} />
          <TakeQuestions onClick={handleClickChange} button_word={take_question_button} />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
