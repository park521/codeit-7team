import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSubjects, deleteSubjects } from "../../api/subjectApi/subjectApi";
import FeedCard from "../../components/Commons/FeedCard/FeedCard";
import FeedCardEmpty from "../../components/Commons/FeedCard/FeedCardEmpty";

// 개별 피드 페이지
function AnswerPage() {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState([]);

  // 삭제 기능
  const handleClickDelete = async () => {
    const result = await deleteSubjects(subjectId);
    if (!result) return;
  };

  // Fetch Subject
  useEffect(() => {
    async function fetchSubject() {
      try {
        const data = await getSubjects(subjectId);
        if (data) {
          setSubject(data);
        } else {
          setSubject([]);
        }
      } catch (error) {
        console.error("Error fetching subject:", error);
      }
    }

    fetchSubject();
  }, [subjectId]);
}

export default AnswerPage;
