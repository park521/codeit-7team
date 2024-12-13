import React, { useState, useEffect } from "react";
import AnswerCompletedButton from "./AnswerCompletedButton";
import GoQuestionButton from "./GoQuestionButton";
import TakeQuestions from "./TakeQuestions";
import WritingQuestionButton from "./WritingQuestionButton";
import DeleteButton from "./DeleteButton";

// 버튼 내용 변수 선언
const do_question_button = "질문 작성하기"; // desktop & tablet
const do_question_button_mobile = "질문 작성"; // mobile
const go_question_button = "질문하러 가기";
const take_question_button = "질문 받기";
const finish_button = "답변 완료";
const delete_button = "삭제하기";

// 질문 작성하기 or 질문 작성 텍스트 반응형 처리
function ButtonTest() {
  const [buttonWord, setButtonWord] = useState(
    getButtonWord(window.innerWidth)
  );

  // 화면 크기에 따라 버튼 텍스트 결정 (질문 작성하기 한정)
  function getButtonWord(width) {
    return width <= 767 ? do_question_button_mobile : do_question_button;
  }

  useEffect(() => {
    const handleResize = () => {
      setButtonWord(getButtonWord(window.innerWidth)); // 화면 크기 변경 시 상태 업데이트
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
      <AnswerCompletedButton button_word={finish_button} /> <br /> <br />
      <h2>질문하러 가기</h2>
      <GoQuestionButton button_word={go_question_button} /> <br /> <br />
      <h2>질문 받기</h2>
      <TakeQuestions button_word={take_question_button} /> <br /> <br />
      <h2>질문 작성하기 [모바일에서는 질문 작성]</h2>
      <WritingQuestionButton button_word={buttonWord} /> <br /> <br />
      <h2>삭제하기</h2>
      <DeleteButton button_word={delete_button} /> <br />
    </div>
  );
}

export default ButtonTest;
