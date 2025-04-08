import { UserDto } from "../dtos/UserDto";

const API_BASE = "http://localhost:3000/api/auth";

export interface AuthResponse {
    token: string;
    user: UserDto;
    csrfToken: string;
    jwtToken: string;
  }

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    return response.json();
  },

  register: async (
    email: string,
    password: string,
    role: string,
  ): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, role }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Registration failed");
    }

    return response.json();
  },
};
