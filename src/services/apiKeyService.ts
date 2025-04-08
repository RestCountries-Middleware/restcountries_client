import { ApiKey } from "../dtos/ApiKeyDto";

const API_BASE = "http://localhost:3000/api/apiKey";

export const apiKeyService = {
  getAllByUserId: async (userId: string): Promise<ApiKey[]> => {
    const jwt = sessionStorage.getItem("jwtToken");
    if (!jwt) {
      throw new Error("JWT token not found");
    }

    const response = await fetch(
      `${API_BASE}/getAllApiKeys/userId?userId=${userId}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch API keys");
    }

    return data;
  },

  generateApiKey: async (userId: string, name: string): Promise<ApiKey> => {
    const jwt = sessionStorage.getItem("jwtToken");
    const csrfToken = sessionStorage.getItem("csrfToken");
    console.log(jwt, csrfToken);
    if (!jwt || !csrfToken) {
      throw new Error("Missing authentication token or CSRF token.");
    }

    const response = await fetch(`${API_BASE}/generateApiKey`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
        "X-CSRF-Token": csrfToken,
      },
      body: JSON.stringify({ userId, name }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to generate API key");
    }

    return data;
  },

  deleteApiKey: async (id: string): Promise<{ message: string }> => {
    const jwt = sessionStorage.getItem("jwtToken");
    const csrfToken = sessionStorage.getItem("csrfToken");

    if (!jwt || !csrfToken) {
      throw new Error("Missing authentication token or CSRF token.");
    }

    const response = await fetch(`${API_BASE}/deleteApiKey/id?id=${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "X-CSRF-Token": csrfToken,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to delete API key");
    }

    return data;
  },
};
