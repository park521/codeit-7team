import styles from "./link.module.css";
import linkIcon from "../../../assets/icon/link-white.svg";
import kakaotalkIcon from "../../../assets/icon/kakaotalk.svg";
import facebookIcon from "../../../assets/icon/facebook-white.svg";

// [링크 | 카카오톡 | 페이스북] 아이콘 컴포넌트
function LinkItem() {
  return (
    <div className={styles.links}>
      <a href="#" className={styles.link_item}>
        <img src={linkIcon} width="18px" height="18px" alt="일반 링크 아이콘" />
      </a>
      <a href="#" className={styles.kakaotalk_item}>
        <img
          src={kakaotalkIcon}
          width="18px"
          height="18px"
          alt="카카오톡 아이콘"
        />
      </a>
      <a href="#" className={styles.facebook_item}>
        <img
          src={facebookIcon}
          width="18px"
          height="18px"
          alt="페이스북 아이콘"
        />
      </a>
    </div>
  );
}

export default LinkItem;
