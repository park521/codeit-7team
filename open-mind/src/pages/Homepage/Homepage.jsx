import React, { useState } from "react";
import "./homepage.css";
import InputField from "../../components/commons/InputField/InputField";
import { Link } from "react-router-dom";
import DefaultButton from "../../components/commons/Buttons/DefaultButton";

const go_question_button = "질문하러 가기";
const take_question_button = "질문 받기";

function Homepage() {
  const [name, setName] = useState("");

  const handleInputChange = (value) => {
    setName(value);
  };

  return (
    <div className="main">
      <div className="main__form">
        <Link to={"/list"}>
          <DefaultButton innerText={go_question_button} hasArrow={true} />
        </Link>
        <h1 className="main__form-logo">OPNE MIND 로고</h1>
        <div className="main__form-group">
          <InputField value={name} onChange={handleInputChange} />
          <DefaultButton innerText={take_question_button} hasArrow={false} />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
