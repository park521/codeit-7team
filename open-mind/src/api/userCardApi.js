const BASE_URL = `https://openmind-api.vercel.app/12-7/`;

export const fetchAllSubjects = async () => {
  try {
    const response = await fetch(`${BASE_URL}subjects/`);
    if (!response.ok) {
      throw new Error(`Failed to fetch subjects: ${response.status}`);
    }
    const data = await response.json();
    console.log("API Response:", data);
    return data.results || [];
  } catch (error) {
    console.error("Error fetching all subjects:", error);
    throw error;
  }
};

export const createSubject = async (name) => {
  try {
    const response = await fetch(`${BASE_URL}subjects/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      throw new Error(`Failed to create subject: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating subject:", error);
    throw error;
  }
};
