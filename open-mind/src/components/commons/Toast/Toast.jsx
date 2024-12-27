import React from "react";
import styles from "./toast.module.css";

function Toast() {
  return (
    <div className={styles.toast_container}>
      <section className={styles.toast_box}>URL이 복사되었습니다</section>
    </div>
  );
}

export default Toast;
