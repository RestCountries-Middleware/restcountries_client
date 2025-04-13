import { UserDto } from "../dtos/UserDto";

const API_BASE = "http://localhost:3000/api/user";

export const userService = {
  getAllUsers: async (userId: string): Promise<UserDto[]> => {
    const jwt = sessionStorage.getItem("jwtToken");
    if (!jwt) {
      throw new Error("JWT token not found");
    }

    const res = await fetch(`${API_BASE}/getAllUsers?userId=${userId}`, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Failed to fetch users");
    return data;
  },

  activateUser: async (userId: string): Promise<void> => {
    const jwt = sessionStorage.getItem("jwtToken");
    const csrfToken = sessionStorage.getItem("csrfToken");
    console.log(jwt, csrfToken);
    if (!jwt || !csrfToken) {
      throw new Error("Missing authentication token or CSRF token.");
    }
    const res = await fetch(
      `${API_BASE}/activateUser/userId?userId=${userId}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
          "X-CSRF-Token": csrfToken,
        },
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to activate user");
  },

  deactivateUser: async (userId: string): Promise<void> => {
    const jwt = sessionStorage.getItem("jwtToken");
    const csrfToken = sessionStorage.getItem("csrfToken");
    console.log(jwt, csrfToken);
    if (!jwt || !csrfToken) {
      throw new Error("Missing authentication token or CSRF token.");
    }

    const res = await fetch(
      `${API_BASE}/deactivateUser/userId?userId=${userId}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
          "X-CSRF-Token": csrfToken,
        },
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to deactivate user");
  },
};
