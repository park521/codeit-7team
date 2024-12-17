import React from "react";
import styled from "styled-components";
import { ReactComponent as EmptySvg } from "../../../assets/img/image3.svg";

const QuestionEmpty = styled.div`
  text-align: center;
  height: 100%;
`;

const EmptyImg = styled(EmptySvg)`
  margin-top: 3.125rem;
`;

// 빈 피드 카드 컴포넌트
function FeedCardEmpty() {
  return (
    <>
      <QuestionEmpty>
        <EmptyImg alt="아직 질문이 없습니다" />
      </QuestionEmpty>
    </>
  );
}

export default FeedCardEmpty;
