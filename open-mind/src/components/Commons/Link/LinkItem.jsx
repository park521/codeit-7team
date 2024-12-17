import styles from "./link.module.css";
import linkIcon from "../../../assets/icon/link-white.svg";
import kakaotalkIcon from "../../../assets/icon/kakaotalk.svg";
import facebookIcon from "../../../assets/icon/facebook-white.svg";

// [링크 | 카카오톡 | 페이스북] 아이콘 컴포넌트
// 토스트 완료 | 카카오톡, 페이스북 공유 API 필요 ~ing
function LinkItem({ onCopy }) {
  const copyURL = () => {
    const currentURL = window.location.href; // 현재 페이지
    navigator.clipboard.writeText(currentURL).then(() => {
      onCopy();
    });
  };

  const shareKakao = () => {
    const kakaoURL = `https://sharer.kakao.com/talk/friends/picker/link?url=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(kakaoURL, "_blank"); // 카카오 공유 URL 새 창 열기
  };

  const shareFacebook = () => {
    const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(facebookURL, "_blank"); // 페이스북 공유 URL 새 창 열기
  };

  return (
    <div className={styles.links}>
      <button onClick={copyURL} className={styles.link_item}>
        <img src={linkIcon} width="18px" height="18px" alt="일반 링크 아이콘" />
      </button>
      <button onClick={shareKakao} className={styles.kakaotalk_item}>
        <img
          src={kakaotalkIcon}
          width="18px"
          height="18px"
          alt="카카오톡 아이콘"
        />
      </button>
      <button onClick={shareFacebook} className={styles.facebook_item}>
        <img
          src={facebookIcon}
          width="18px"
          height="18px"
          alt="페이스북 아이콘"
        />
      </button>
    </div>
  );
}

export default LinkItem;
