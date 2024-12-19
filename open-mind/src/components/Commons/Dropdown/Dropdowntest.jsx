import React from "react";
import Dropdown from "./Dropdown";
import Edit from "../../../assets/icon/edit.svg";
import Close from "../../../assets/icon/close.svg";
import More from "../../../assets/icon/more.svg";

function Dropdowntest() {
  const values = [{ value: "최신순" }, { value: "이름순" }];
  const values1 = [
    { value: "수정하기", icon: Edit },
    { value: "삭제하기", icon: Close },
  ];
  return (
    <>
      <h1>버튼 = 텍스트 </h1>
      <Dropdown values={values} defaultValue="최신순" />
      <h1>버튼 = 이미지, 드롭다운 메뉴에 아이콘 </h1>
      <Dropdown
        values={values1}
        isImageButton="true"
        imageButtonSrc={More}
        imageButtonAlt="드롭다운 버튼 이미지"
      />
    </>
  );
}

export default Dropdowntest;
