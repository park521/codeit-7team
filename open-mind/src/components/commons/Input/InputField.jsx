import React from "react";
import styles from "./inputField.module.css";
import Person from "../../../assets/icon/person-gray.svg";

function InputField({ value, onChange, placeholder, className = "", clear }) {
  return (
    <div className={`${styles.input_container} ${className}`}>
      <img src={Person} alt="인풋 아이콘" className={styles.input_icon} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={styles.input_field}
      />
      {clear && value && (
        <button
          className={styles.clear_button}
          onClick={() => onChange("")}
          aria-label="Clear input"
        >
          X
        </button>
      )}
    </div>
  );
}

export default InputField;
