import React from "react";
import { useState } from "react";
import { ReactComponent as LikeIcon } from "../../../assets/icon/thumbs-up-gray.svg";
import { ReactComponent as DisLikeIcon } from "../../../assets/icon/thumbs-down-gray.svg";
import styled from "styled-components";

const FeedFavoriteContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  padding-top: 1.5625rem;
  border-top: 1px solid var(--gray30-color);
`;

const FeedLike = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  color: ${(theme) =>
    theme.isActive ? "var(--blue50-color)" : "var(--gray40-color)"};
  cursor: pointer;

  path {
    fill: ${(theme) =>
      theme.isActive ? "var(--blue50-color)" : "var(--gray40-color)"};
  }
`;

const FeedHate = styled(FeedLike)``;

// 피드 좋아요, 싫어요
function FeedCardReaction({ like, dislike }) {
  const [isLikeCheck, setIsLikeCheck] = useState(false);
  const [isDisLikeCheck, setIsDisLikeCheck] = useState(false);
  // 좋아요 개수 0이면 표기 x
  const setLike = () => {
    return like === 0 ? "" : like;
  };
  // 싫어요 개수 0이면 표기 x
  const setDisLike = () => {
    return dislike === 0 ? "" : dislike;
  };

  const handleLikeClick = () => {
    setIsLikeCheck(!isLikeCheck);
  };

  const handleDisLikeClick = () => {
    setIsDisLikeCheck(!isDisLikeCheck);
  };

  return (
    <FeedFavoriteContainer>
      <FeedLike isActive={isLikeCheck} onClick={handleLikeClick}>
        <LikeIcon style={{ width: "1rem", height: "1rem" }} />
        좋아요 {setLike()}
      </FeedLike>
      <FeedHate isActive={isDisLikeCheck} onClick={handleDisLikeClick}>
        <DisLikeIcon style={{ width: "1rem", height: "1rem" }} />
        싫어요 {setDisLike()}
      </FeedHate>
    </FeedFavoriteContainer>
  );
}

export default FeedCardReaction;
