// https://openmind-api.vercel.app/docs/ 오픈마인드 API 주소(Swagger주소)
const BASE_URL = `https://openmind-api.vercel.app/12-7/`;

// 답변 생성
export async function postAnswers(questionId, formData) {
  if (!questionId) {
    throw new Error("postAnswers Error: Invalid question ID");
  }
  if (!formData) {
    throw new Error("postAnswers Error: formData is required");
  }

  try {
    const response = await fetch(
      `${BASE_URL}questions/${questionId}/answers/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP response error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("post answer Error:", error);
    throw error;
  }
}

// 답변 조회
export async function getAnswers(answerId) {
  if (!answerId) {
    throw new Error("getAnswers Error: Invalid answer ID");
  }

  try {
    const response = await fetch(`${BASE_URL}answers/${answerId}/`);
    if (!response.ok) {
      throw new Error(`HTTP response error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Failed to fetch answer:", error);
    throw error;
  }
}

// 답변 삭제
export async function deleteAnswers(answerId) {
  if (!answerId) {
    throw new Error("deleteAnswers Error: Invalid answer ID");
  }

  try {
    const response = await fetch(`${BASE_URL}answers/${answerId}/`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP response error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("delete answer Error:", error);
    throw error;
  }
}

// 답변 수정 put
export async function putAnswers(answerId, formData) {
  if (!answerId) {
    throw new Error("putAnswers Error: Invalid answer ID");
  }
  if (!formData) {
    throw new Error("putAnswers Error: formData is required");
  }

  try {
    const response = await fetch(`${BASE_URL}answers/${answerId}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error(`HTTP response error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("put answer Error:", error);
    throw error;
  }
}

// 답변 수정 patch
export async function patchAnswers(answerId, formData) {
  if (!answerId) {
    throw new Error("patchAnswers Error: Invalid answer ID");
  }
  if (!formData) {
    throw new Error("patchAnswers Error: formData is required");
  }

  try {
    const response = await fetch(`${BASE_URL}answers/${answerId}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error(`HTTP response error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("patch answer Error:", error);
    throw error;
  }
}
