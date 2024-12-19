import React, { useState } from "react";
import styles from "./homepage.module.css";
import InputField from "../../components/commons/InputField/InputField";
import DefaultButton from "../../components/commons/Buttons/DefaultButton";
import { Link, useNavigate } from "react-router-dom";
import { handleCreateFeed } from "../../api/hompage/homepage";

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
  };

  return (
    <div className={styles.main}>
      <div className={styles.main__form}>
        <Link to={"/list"}>
          <DefaultButton innerText={go_question_button} hasArrow={true} />
        </Link>
        <h1 className={styles.main__form_logo}>OPEN MIND 로고</h1>
        <div className={styles.main__form_group}>
          <InputField
            value={name}
            onChange={handleInputChange}
            placeholder={"이름을 입력하세요"}
          />
          <DefaultButton
            onClick={handleClickChange}
            innerText={take_question_button}
            hasArrow={false}
          />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
