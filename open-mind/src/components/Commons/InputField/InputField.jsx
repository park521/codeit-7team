import React from "react";
import styles from "./inputField.module.css";
import Person from "../../../assets/icon/person-gray.svg";

function InputField({ value, onChange }) {
  return (
    <div className={styles.input_container}>
      <img src={Person} alt="인풋 아이콘" className={styles.input_icon} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="이름을 입력하세요"
        className={styles.input_field}
      />
    </div>
  );
}

export default InputField;