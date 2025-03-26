import api from "./api";
import type { User } from "../types";

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  success: boolean;
  user: User;
};

export const authService = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    return response.data.user;
  },

  register: async (data: RegisterData): Promise<User> => {
    const response = await api.post<AuthResponse>("/auth/register", data);
    return response.data.user;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  getCurrentUser: async (): Promise<User | null> => {
    try {
      const response = await api.get<{ user: User }>("/auth/user");
      return response.data.user;
    } catch {
      return null;
    }
  },
};
