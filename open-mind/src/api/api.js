// https://openmind-api.vercel.app/docs/ 오픈마인드 API 주소(Swagger주소)
const BASE_URL = `https://openmind-api.vercel.app/12-7/`;

export async function postAnswers(questionId, formData) {
  if (!questionId) {
    throw new Error("Invalid question ID");
  }

  try {
    const response = await fetch(
      `${BASE_URL}questions/${questionId}/answers/`,
      {
        method: "POST",
        body: formData,
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP respense error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("post answer Error:", error);
    throw error;
  }
}

export async function getAnswers(answerId) {
  if (!answerId) {
    throw new Error("Invalid answer ID");
  }

  try {
    const response = await fetch(`${BASE_URL}answers/${answerId}/`);
    if (!response.ok) {
      throw new Error(`HTTP respense error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Failed to fetch answer:", error);
    throw error;
  }
}

export async function putAnswers(answerId, formData) {
  if (!answerId) {
    throw new Error("Invalid answer ID");
  }

  try {
    const response = await fetch(`${BASE_URL}answers/${answerId}/`, {
      method: "PUT",
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`HTTP respense error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("update answer Error:", error);
    throw error;
  }
}

export async function deleteAnswers(answerId) {
  if (!answerId) {
    throw new Error("Invalid answer ID");
  }

  try {
    const response = await fetch(`${BASE_URL}answers/${answerId}/`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP respense error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("delete answer Error:", error);
    throw error;
  }
}

export async function patchAnswers(answerId, formData) {
  if (!answerId) {
    throw new Error("Invalid answer ID");
  }

  try {
    const response = await fetch(`${BASE_URL}answers/${answerId}/`, {
      method: "PATCH",
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`HTTP respense error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("update answer Error:", error);
    throw error;
  }
}
