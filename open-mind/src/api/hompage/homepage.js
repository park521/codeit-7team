const BASE_URL = `https://openmind-api.vercel.app/12-7/`;

export async function handleCreateFeed(name, navigate) {
  if (!name) {
    alert("이름을 입력해주세요.");
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}subjects/`, {
      method: "POST",
      body: JSON.stringify({ name: name }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("피드 생성에 실패했습니다.");
    }

    const data = await response.json();
    localStorage.setItem("id", data.id);
    const feedId = data.id;

    navigate(`/post/${feedId}/answer`);
  } catch (error) {
    console.error("피드 생성 에러:", error);
    alert("피드 생성 중 오류가 발생했습니다.");
  }
}
