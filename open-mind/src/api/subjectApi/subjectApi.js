// https://openmind-api.vercel.app/docs/ 오픈마인드 API 주소(Swagger주소)
const BASE_URL = `https://openmind-api.vercel.app/12-7/`;

// 질문 대상 생성
export async function postSubjects(formData) {
  if (!formData) {
    throw new Error("postSubjects Error: formData is required");
  }

  try {
    const response = await fetch(`${BASE_URL}subjects/`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`HTTP response error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("post subject Error:", error);
    throw error;
  }
}

// 질문 대상 목록 조회
export async function getSubjectsList({
  limit = 8,
  offset = 0,
  sort = "time",
}) {
  const query = `limit=${limit}&offset=${offset}&sort=${sort}`;

  try {
    const response = await fetch(`${BASE_URL}subjects/?${query}`);
    if (!response.ok) {
      throw new Error(`HTTP response error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Failed to fetch subjects list:", error);
    throw error;
  }
}

// 질문 대상 조회
export async function getSubjects(subjectId) {
  if (!subjectId) {
    throw new Error("getSubjects Error: Invalid subject ID");
  }

  try {
    const response = await fetch(`${BASE_URL}subjects/${subjectId}/`);
    if (!response.ok) {
      throw new Error(`HTTP response error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Failed to fetch subject:", error);
    throw error;
  }
}

// 질문 대상 삭제
export async function deleteSubjects(subjectId) {
  if (!subjectId) {
    throw new Error("deleteSubjects Error: Invalid subject ID");
  }

  try {
    const response = await fetch(`${BASE_URL}subjects/${subjectId}/`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP response error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("delete subject Error:", error);
    throw error;
  }
}
