import React, { useState } from "react";
import styles from "./homepage.module.css";
import InputField from "../../components/commons/Input/InputField";
import DefaultButton from "../../components/commons/Button/DefaultButton";
import { Link, useNavigate } from "react-router-dom";
import { handleCreateFeed } from "../../api/subject/subject";

import logo1 from "../../assets/logo/logo1.png";
import logo2 from "../../assets/logo/logo2.png";
import logo3 from "../../assets/logo/logo3.png";
import logo4 from "../../assets/logo/logo4.png";
import logo5 from "../../assets/logo/logo5.png";
import logo6 from "../../assets/logo/logo6.png";
import logo7 from "../../assets/logo/logo7.png";
import logo8 from "../../assets/logo/logo8.png";

import sublogo1 from "../../assets/logo/sublogo1.png";
import sublogo2 from "../../assets/logo/sublogo2.png";

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
        <h1 className={styles.main__form_logo}>
          <p>
            <span className={styles.circle}></span>
            <span className={styles.circle}></span>
          </p>
          <p className={styles.main__form_logo_title}>
            <img src={logo1} alt="O" />
            <img src={logo2} alt="P" />
            <img src={logo3} alt="E" />
            <img src={logo4} alt="N" />
            <img src={logo5} alt="M" />
            <img src={logo6} alt="I" />
            <img src={logo7} alt="N" />
            <img src={logo8} alt="D" />
          </p>
          <p className={styles.main__form_logo_subtitle}>
            <img src={sublogo1} alt="" />
            <img src={sublogo2} alt="" />
          </p>
        </h1>
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
