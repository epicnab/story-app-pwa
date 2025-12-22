import CONFIG from "../config";

const ENDPOINTS = {
  STORIES: `${CONFIG.BASE_URL}/stories`,
  REGISTER: `${CONFIG.BASE_URL}/register`,
  LOGIN: `${CONFIG.BASE_URL}/login`,
};

export async function getStories() {
  const headers = {};
  const token = localStorage.getItem("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(ENDPOINTS.STORIES, { headers });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch stories");
  }
  return data.listStory || [];
}

export async function addStory(storyData) {
  const response = await fetch(ENDPOINTS.STORIES, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: storyData,
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to add story");
  }
  return data;
}

export async function deleteStory(storyId) {
  const endpoints = [
    `${ENDPOINTS.STORIES}/${storyId}`,
    `${CONFIG.BASE_URL}/story/${storyId}`,
    `${ENDPOINTS.STORIES}/delete/${storyId}`,
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: storyId }),
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {}
  }

  try {
    const response = await fetch(`${ENDPOINTS.STORIES}/delete`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: storyId }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {}

  throw new Error("Delete operation not supported by this API");
}

export async function registerUser(userData) {
  const response = await fetch(ENDPOINTS.REGISTER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to register");
  }
  return data;
}

export async function loginUser(userData) {
  const response = await fetch(ENDPOINTS.LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to login");
  }
  if (data.loginResult?.token) {
    localStorage.setItem("token", data.loginResult.token);
  }
  return data;
}
