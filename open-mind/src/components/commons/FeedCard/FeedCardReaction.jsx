import React, { useState, useEffect } from "react";
import { ReactComponent as LikeIconGray } from "../../../assets/icon/thumbs-up-gray.svg";
import { ReactComponent as LikeIconBlue } from "../../../assets/icon/thumbs-up-blue.svg";
import { ReactComponent as DisLikeIconGray } from "../../../assets/icon/thumbs-down-gray.svg";
import { ReactComponent as DisLikeIconBlue } from "../../../assets/icon/thumbs-down-blue.svg";
import styled from "styled-components";
import { postQuestionsReaction } from "../../../api/question/question"; // API 호출 함수 import

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
  color: ${(props) =>
    props.$active ? "var(--blue50-color)" : "var(--gray40-color)"};
  cursor: pointer;
`;

const FeedHate = styled(FeedLike)``;

const FeedCardReaction = ({ questionId, initialLike, initialDislike }) => {
  const [likeCount, setLikeCount] = useState(initialLike);
  const [dislikeCount, setDislikeCount] = useState(initialDislike);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  useEffect(() => {
    setLikeCount(initialLike);
    setDislikeCount(initialDislike);

    // 로컬 스토리지에서 사용자가 좋아요나 싫어요를 이미 클릭했는지 확인
    const userReaction = localStorage.getItem(`reaction-${questionId}`);
    if (userReaction === "liked") {
      setIsLiked(true);
    } else if (userReaction === "disliked") {
      setIsDisliked(true);
    }
  }, [initialLike, initialDislike, questionId]);

  // 좋아요 클릭 시 처리
  const handleLikeClick = async () => {
    // 이미 좋아요를 눌렀으면 아무 것도 하지 않음
    if (isLiked) return;

    // 싫어요를 취소하고 좋아요를 활성화
    if (isDisliked) {
      setIsDisliked(false);
      localStorage.removeItem(`reaction-${questionId}`); // 로컬 스토리지에서 상태 삭제
    }
    setIsLiked(true);
    localStorage.setItem(`reaction-${questionId}`, "liked"); // 로컬 스토리지에 상태 저장

    try {
      const response = await postQuestionsReaction(questionId, {
        type: "like",
      });
      setLikeCount(response.like); // 서버에서 응답 받은 like 개수로 상태 업데이트
      setDislikeCount(response.dislike); // 서버에서 응답 받은 dislike 개수로 상태 업데이트
    } catch (error) {
      console.error("Like API 호출 중 오류 발생:", error);
    }
  };

  // 싫어요 클릭 시 처리
  const handleDislikeClick = async () => {
    // 이미 싫어요를 눌렀으면 아무 것도 하지 않음
    if (isDisliked) return;

    // 좋아요를 취소하고 싫어요를 활성화
    if (isLiked) {
      setIsLiked(false);
      localStorage.removeItem(`reaction-${questionId}`); // 로컬 스토리지에서 상태 삭제
    }
    setIsDisliked(true);
    localStorage.setItem(`reaction-${questionId}`, "disliked"); // 로컬 스토리지에 상태 저장

    try {
      const response = await postQuestionsReaction(questionId, {
        type: "dislike",
      });
      setLikeCount(response.like); // 서버에서 응답 받은 like 개수로 상태 업데이트
      setDislikeCount(response.dislike); // 서버에서 응답 받은 dislike 개수로 상태 업데이트
    } catch (error) {
      console.error("Dislike API 호출 중 오류 발생:", error);
    }
  };

  const formatCount = (count) => (count === 0 ? "" : count);

  return (
    <FeedFavoriteContainer>
      <FeedLike $active={isLiked} onClick={handleLikeClick}>
        {isLiked ? (
          <LikeIconBlue style={{ width: "1rem", height: "1rem" }} />
        ) : (
          <LikeIconGray style={{ width: "1rem", height: "1rem" }} />
        )}
        좋아요 {formatCount(likeCount)}
      </FeedLike>
      <FeedHate $active={isDisliked} onClick={handleDislikeClick}>
        {isDisliked ? (
          <DisLikeIconBlue style={{ width: "1rem", height: "1rem" }} />
        ) : (
          <DisLikeIconGray style={{ width: "1rem", height: "1rem" }} />
        )}
        싫어요 {formatCount(dislikeCount)}
      </FeedHate>
    </FeedFavoriteContainer>
  );
};

export default FeedCardReaction;
