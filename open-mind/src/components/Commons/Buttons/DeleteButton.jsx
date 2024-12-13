import styles from "./button.module.css";

function DeleteButton({ button_word }) {
  return <button className={styles.delete_button}>{button_word}</button>;
}

export default DeleteButton;
