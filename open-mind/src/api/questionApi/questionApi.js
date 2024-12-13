// https://openmind-api.vercel.app/docs/ 오픈마인드 API 주소(Swagger주소)
const BASE_URL = `https://openmind-api.vercel.app/12-7/`;

// 질문 생성
export async function postQuestions(subjectId, formData) {
  if (!subjectId) {
    throw new Error("postQuestions Error: Invalid subject ID");
  }
  if (!formData) {
    throw new Error("postQuestions Error: formData is required");
  }

  try {
    const response = await fetch(
      `${BASE_URL}subjects/${subjectId}/questions/`,
      {
        method: "POST",
        body: formData,
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP response error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("post question Error:", error);
    throw error;
  }
}

// 대상 질문 목록 조회
export async function getQuestionsList(subjectId, { limit = 5, offset = 0 }) {
  if (!subjectId) {
    throw new Error("getQuestionsList Error: Invalid subject ID");
  }
  const query = `limit=${limit}&offset=${offset}`;

  try {
    const response = await fetch(
      `${BASE_URL}subjects/${subjectId}/questions/?${query}`
    );
    if (!response.ok) {
      throw new Error(`HTTP response error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Failed to fetch questions list:", error);
    throw error;
  }
}

// 질문 조회
export async function getQuestions(questionId) {
  if (!questionId) {
    throw new Error("getQuestions Error: Invalid question ID");
  }

  try {
    const response = await fetch(`${BASE_URL}questions/${questionId}/`);
    if (!response.ok) {
      throw new Error(`HTTP response error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Failed to fetch question:", error);
    throw error;
  }
}

// 질문 삭제
export async function deleteQuestions(questionId) {
  if (!questionId) {
    throw new Error("deleteQuestions Error: Invalid question ID");
  }

  try {
    const response = await fetch(`${BASE_URL}questions/${questionId}/`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP response error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("delete question Error:", error);
    throw error;
  }
}

// 질문 리액션 달기
export async function postQuestionsReaction(questionId, formData) {
  if (!questionId) {
    throw new Error("postQuestionsReaction Error: Invalid question ID");
  }
  if (!formData) {
    throw new Error("postQuestionsReaction Error: formData is required");
  }

  try {
    const response = await fetch(
      `${BASE_URL}questions/${questionId}/reaction/`,
      {
        method: "POST",
        body: formData,
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP response error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("post questions reaction Error:", error);
    throw error;
  }
}
