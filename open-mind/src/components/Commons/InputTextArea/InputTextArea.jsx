import React from "react";
import styles from "./InputTextArea.module.css";

function InputTextArea({ value, onChange, placeholder }) {
    return (
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={styles.textarea}
        ></textarea>
    );
}

export default InputTextArea;
