import React, { useState, useEffect } from "react";
import Badge from "../Badge/Badge";
import DefaultButton from "./DefaultButton";

// 버튼 내용 변수 선언
const do_question_button = "질문 작성하기"; // desktop & tablet
const do_question_button_mobile = "질문 작성"; // mobile
const go_question_button = "질문하러 가기";
const go_answer_button = "답변하러 가기";
const take_question_button = "질문 받기";
const finish_button = "답변 완료";
const delete_button = "삭제하기";

// 질문 작성하기 or 질문 작성 텍스트 반응형 처리
function ButtonTest() {
  const [innerText, setInnerText] = useState(getInnerText(window.innerWidth));

  // 화면 크기에 따라 버튼 텍스트 결정 (질문 작성하기 한정)
  function getInnerText(width) {
    return width <= 767 ? do_question_button_mobile : do_question_button;
  }

  useEffect(() => {
    const handleResize = () => {
      setInnerText(getInnerText(window.innerWidth)); // 화면 크기 변경 시 상태 업데이트
    };

    window.addEventListener("resize", handleResize); // 이벤트 리스너 등록

    return () => {
      window.removeEventListener("resize", handleResize); // 컴포넌트 언마운트 시 리스너 제거
    };
  }, []);

  return (
    <div>
      <h1>버튼 테스트 페이지 입니다.</h1>
      <h2>답변완료</h2>
      <DefaultButton innerText={finish_button} hasArrow={false} /> <br /> <br />
      <h2>질문하러 가기</h2>
      <DefaultButton
        innerText={go_question_button}
        hasArrow={true}
      /> <br /> <br />
      <h2>답변하러 가기</h2>
      <DefaultButton innerText={go_answer_button} hasArrow={true} /> <br />{" "}
      <br />
      <h2>질문 받기</h2>
      <DefaultButton
        innerText={take_question_button}
        hasArrow={false}
      /> <br /> <br />
      <h2>질문 작성하기 [모바일에서는 질문 작성]</h2>
      <DefaultButton innerText={innerText} hasArrow={false} /> <br /> <br />
      <h2>삭제하기</h2>
      <DefaultButton innerText={delete_button} hasArrow={false} /> <br />
      <br /> <br />
      <Badge answer={"답변"} />
    </div>
  );
}

export default ButtonTest;
