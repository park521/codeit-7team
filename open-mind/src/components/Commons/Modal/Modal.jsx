import React, { useEffect, useState } from "react";
import { getSubjects } from "../../../api/subjectApi/subjectApi";
import questionIcon from "../../../assets/icon/messages.svg";
import closeIcon from "../../../assets/icon/close.svg";
import "./Modal.css";

export default function Modal({ subjectId, setIsModal }) {
  const [subject, setSubject] = useState({});
  const [question, setQuestion] = useState("");

  const handleInputChange = (e) => {
    // 질문 작성
    setQuestion(e.target.value);
  };

  const handlePost = () => {}; // 질문 제출

  useEffect(() => {
    const fetchSubjectData = async () => {
      try {
        const subjectData = await getSubjects(subjectId);

        if (subjectData) {
          setSubject(subjectData);
        } else {
          setSubject({});
        }
      } catch (err) {
        console.error("Failed to fetch subject data:", err);
      }
    };

    if (subjectId) {
      fetchSubjectData();
    }
  }, [subjectId]);

  return (
    <div>
      <div className="modal_back" onClick={() => setIsModal(false)}>
        {/*모달 배경을 클릭하면 창 닫기*/}
        <div className="modal_content" onClick={(e) => e.stopPropagation()}>
          {" "}
          {/*모달 콘텐츠 영역 내부에서 클릭한 경우에는 모달이 닫히지 않도록*/}
          <div className="modal_header">
            <div className="modal_header_left">
              <img src={questionIcon} alt="질문" />
              <h2>질문을 작성하세요</h2>
            </div>
            <img
              className="close_button"
              src={closeIcon}
              onClick={() => setIsModal(false)}
              alt="닫기"
            />
          </div>
          <div className="modal_to">
            <h4>To.</h4>
            <img
              className="modal_profile_image"
              src={subject.imageSource}
              alt="프로필 이미지"
            />
            <h4>{subject.name}</h4>
          </div>
          <input
            className="modal_question"
            placeholder="질문을 입력해주세요"
            value={question}
            onChange={handleInputChange}
          ></input>
          <button
            className="post_button"
            type="button"
            onClick={handlePost}
            disabled={!question}
          >
            질문 보내기
          </button>
        </div>
      </div>
    </div>
  );
}
