const kakaoAppKey = process.env.REACT_APP_Kakao_Client_ID;

export const shareKakao = (subject) => {
  if (window.Kakao) {
    const kakao = window.Kakao;

    if (!kakao.isInitialized()) {
      kakao.init(kakaoAppKey);
      console.log("Kakao initialized:", kakao.isInitialized());
    }
    try {
      kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: subject.name, // 제목
          description: `${subject.name}에 대해 질문을 작성해보세요!`, // 설명
          imageUrl: subject.imageSource, // 이미지
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: "자세히 보기",
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    } catch (error) {
      console.error("Kakao Link Error:", error);
    }
  } else {
    console.error("Kakao SDK is not loaded.");
  }
};
