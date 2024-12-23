import React from "react";
import styles from "./InputTextArea.module.css";

function InputTextArea({ value, onChange, placeholder, name }) {
  return (
    <textarea
      name={name}
      value={value}
      onChange={(e) => onChange(e)}
      placeholder={placeholder}
      className={styles.textarea}
    ></textarea>
  );
}

export default InputTextArea;
