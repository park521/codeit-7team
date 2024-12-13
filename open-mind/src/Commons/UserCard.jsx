import React, { useEffect, useState } from "react";
import { fetchAllSubjects } from "../api/userCardApi";
import "./userCard.css";

function UserCard() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSubjects = async () => {
      try {
        const data = await fetchAllSubjects();
        console.log(data);
        setSubjects(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getSubjects();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!subjects.length) {
    return <p>No subjects found</p>;
  }

  return (
    <div>
      {subjects.map((subject) => (
        <div key={subject.id} className="user-card">
          <div className="user-card-container">
            <img
              src={subject.imageSource}
              alt={subject.name}
              className="user-image"
            />
            <h2 className="user-name">{subject.name}</h2>
            <div className="question">
              <p>받은 질문 </p>
              <p>{subject.questionCount}개</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserCard;
