import React, { useState } from "react";
import questionIcon from "../../../assets/icon/messages.svg";
import closeIcon from "../../../assets/icon/close.svg";
import "./Modal.css";

const INITIAL_VALUES = {
  content: "",
  like: 1,
  dislike: 1,
  answer: {
    content: "string",
    isRejected: true,
  },
};
export default function Modal({
  subject,
  setIsModal,
  addQuestion,
  initialValues = INITIAL_VALUES,
}) {
  const [values, setValues] = useState(initialValues);

  const handlePost = async (e) => {
    e.preventDefault();
    const formData = {
      ...values,
    };
    formData.content = values.content;
    formData.subjectId = subject.id;
    let result;
    try {
      result = await addQuestion(subject.id, formData);
    } catch (error) {
      console.error("Error submitting post answer:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="modal_back" onClick={() => setIsModal(false)}>
        {/*모달 배경을 클릭하면 창 닫기*/}
        <div className="modal_content" onClick={(e) => e.stopPropagation()}>
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
          <form onSubmit={handlePost}>
            <textArea
              name="content"
              className="modal_question"
              placeholder="질문을 입력해주세요"
              value={values.content}
              onChange={handleChange}
            ></textArea>
            <button
              className="post_button"
              type="submit"
              disabled={!values.content}
            >
              질문 보내기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
