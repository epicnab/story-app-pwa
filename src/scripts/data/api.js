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
  const token = localStorage.getItem("token");
  console.log("API addStory called with token:", !!token);

  const response = await fetch(ENDPOINTS.STORIES, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: storyData,
  });

  console.log("API response status:", response.status);

  let data;
  try {
    data = await response.json();
    console.log("API response data:", data);
  } catch (e) {
    console.error("Failed to parse API response:", e);
    throw new Error("Invalid API response");
  }

  if (!response.ok) {
    const errorMsg = data.message || `HTTP ${response.status}: ${response.statusText}`;
    console.error("API error:", errorMsg);
    throw new Error(errorMsg);
  }

  return data;
}

export async function deleteStory(storyId) {
  console.log(`Attempting to delete story with ID: ${storyId}`);

  const token = localStorage.getItem("token");
  console.log("Auth token present:", !!token);

  const endpoints = [
    { url: `${ENDPOINTS.STORIES}/${storyId}`, method: "DELETE", body: null },
    { url: `${CONFIG.BASE_URL}/story/${storyId}`, method: "DELETE", body: null },
    { url: `${ENDPOINTS.STORIES}/delete/${storyId}`, method: "DELETE", body: JSON.stringify({ id: storyId }) },
  ];

  for (const { url, method, body } of endpoints) {
    try {
      console.log(`Trying endpoint: ${method} ${url}`);

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      if (body || method === "POST") {
        headers["Content-Type"] = "application/json";
      }

      const response = await fetch(url, {
        method,
        headers,
        ...(body && { body }),
      });

      console.log(`Response status: ${response.status} ${response.statusText}`);

      let responseData;
      try {
        responseData = await response.json();
        console.log("Response data:", responseData);
      } catch (e) {
        console.log("No JSON response body");
        responseData = null;
      }

      if (response.ok) {
        console.log(`✅ Delete successful via ${method} ${url}`);
        return responseData || { success: true };
      } else {
        console.log(`❌ Delete failed: ${response.status} - ${responseData?.message || response.statusText}`);
      }
    } catch (error) {
      console.error(`Network error for ${method} ${url}:`, error);
    }
  }

  try {
    console.log(`Trying POST ${ENDPOINTS.STORIES}/delete`);

    const response = await fetch(`${ENDPOINTS.STORIES}/delete`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: storyId }),
    });

    console.log(`POST delete response status: ${response.status}`);

    if (response.ok) {
      const data = await response.json();
      console.log("POST delete successful:", data);
      return data;
    } else {
      const errorData = await response.json().catch(() => null);
      console.log("POST delete failed:", errorData);
    }
  } catch (error) {
    console.error("POST delete network error:", error);
  }

  console.error("All delete attempts failed");
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

/* ======================
   BOOKMARK API CALLS
====================== */
export async function bookmarkStory(storyId) {
  console.log(`Attempting to bookmark story: ${storyId}`);

  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token");
  }

  const endpoints = [
    `${ENDPOINTS.STORIES}/${storyId}/bookmark`,
    `${ENDPOINTS.STORIES}/${storyId}/favorite`,
    `${CONFIG.BASE_URL}/bookmark/${storyId}`,
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`Trying bookmark endpoint: POST ${endpoint}`);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log(`Bookmark response status: ${response.status}`);

      if (response.ok) {
        const data = await response.json().catch(() => ({ success: true }));
        console.log(`✅ Bookmark successful via POST ${endpoint}`);
        return data;
      } else {
        const errorData = await response.json().catch(() => null);
        console.log(`❌ Bookmark failed: ${response.status} - ${errorData?.message || response.statusText}`);
      }
    } catch (error) {
      console.error(`Network error for POST ${endpoint}:`, error);
    }
  }

  console.warn("All bookmark endpoints failed, using local storage only");
  throw new Error("Bookmark operation not supported by this API");
}

export async function unbookmarkStory(storyId) {
  console.log(`Attempting to unbookmark story: ${storyId}`);

  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token");
  }

  const endpoints = [
    `${ENDPOINTS.STORIES}/${storyId}/bookmark`,
    `${ENDPOINTS.STORIES}/${storyId}/favorite`,
    `${CONFIG.BASE_URL}/bookmark/${storyId}`,
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`Trying unbookmark endpoint: DELETE ${endpoint}`);

      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(`Unbookmark response status: ${response.status}`);

      if (response.ok) {
        const data = await response.json().catch(() => ({ success: true }));
        console.log(`✅ Unbookmark successful via DELETE ${endpoint}`);
        return data;
      } else {
        const errorData = await response.json().catch(() => null);
        console.log(`❌ Unbookmark failed: ${response.status} - ${errorData?.message || response.statusText}`);
      }
    } catch (error) {
      console.error(`Network error for DELETE ${endpoint}:`, error);
    }
  }

  console.warn("All unbookmark endpoints failed, using local storage only");
  throw new Error("Unbookmark operation not supported by this API");
}

export async function getBookmarkedStories() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token");
  }

  const endpoints = [
    `${ENDPOINTS.STORIES}/bookmarks`,
    `${ENDPOINTS.STORIES}/favorites`,
    `${CONFIG.BASE_URL}/bookmarks`,
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`Trying get bookmarks endpoint: GET ${endpoint}`);

      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Get bookmarks successful via GET ${endpoint}`);
        return data.bookmarks || data.listStory || [];
      } else {
        console.log(`❌ Get bookmarks failed: ${response.status}`);
      }
    } catch (error) {
      console.error(`Network error for GET ${endpoint}:`, error);
    }
  }

  console.warn("All get bookmarks endpoints failed");
  throw new Error("Get bookmarks operation not supported by this API");
}
