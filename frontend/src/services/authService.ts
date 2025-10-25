import { api } from "./api";
import { User } from "../types";
import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";

export interface LoginCredentials {
  email: string;
  password: string;
  name?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: "admin" | "user";
}

export interface AuthToken {
  token: string;
  refreshToken?: string;
}

export type AuthResponse = {
  success: boolean;
  data?: { user: User; token: string };
  message?: string;
};

const API_BASE = process.env.REACT_APP_API_URL;

const sendTokenToBackend = async (
  userCred: UserCredential
): Promise<AuthResponse> => {
  const token = await userCred.user.getIdToken();

  const res = await api.post<{
    status: "login" | "register";
    uid: string;
    email: string;
    name?: string;
  }>("/auth", {
    token: token,
  });

  if (res.success && res.data) {
    const backendUser = res.data;
    const user = {
      id: backendUser.uid,
      name:
        backendUser.name ||
        userCred.user.displayName ||
        backendUser.email?.split("@")[0],
      email: backendUser.email,
      avatar: userCred.user.photoURL || "",
      role: "user" as const,
      progress: {
        totalTests: 0,
        completedTests: 0,
        averageScore: 0,
        strongAreas: [],
        weakAreas: [],
        speaking: 0,
        writing: 0,
        reading: 0,
        listening: 0,
        createdAt: new Date().toISOString(),
      },
      createdAt: new Date().toISOString(),
    };

    // persist
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));

    return { success: true, data: { user, token } };
  }

  return { success: false, message: res.message || "Backend auth failed" };
};

export const authService = {
  loginWithDb: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const res = await api.post<{ user: User; token: string }>(
        `${API_BASE}/auth/login`,
        {
          email: credentials.email,
          password: credentials.password,
        }
      );
      if (res.success && res.data) {
        const { user, token } = res.data;
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(user));
        return { success: true, data: { user, token } };
      } else {
        return { success: false, message: res.message || "Login failed" };
      }
    } catch (err: any) {
      console.error("DB login error:", err);
      return { success: false, message: err.message || "Login failed" };
    }
  },

  registerWithDb: async (data: {
    name: string;
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    try {
      const res = await api.post<{ user: User; token: string }>(
        `${API_BASE}/auth/register`,
        {
          full_name: data.name,
          email: data.email,
          password: data.password,
        }
      );

      if (res.success && res.data) {
        const { user, token } = res.data;
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(user));

        return { success: true, data: { user, token } };
      } else {
        return {
          success: false,
          message: res.message || "Registration failed",
        };
      }
    } catch (err: any) {
      console.error("DB registration error:", err);
      return { success: false, message: err.message || "Registration failed" };
    }
  },

  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const userCred = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      return await sendTokenToBackend(userCred);
    } catch (err: any) {
      console.error("Firebase login error:", err.code, err.message);
      return { success: false, message: err.message || "Login failed" };
    }
  },

  register: async (data: {
    name: string;
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      // Optionally update displayName here using updateProfile if you want
      return await sendTokenToBackend(userCred);
    } catch (err: any) {
      return { success: false, message: err.message || "Registration failed" };
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn("Firebase signOut error", e);
    }
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    window.location.href = "/";
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: (): boolean => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("user");
    return !!(token && user);
  },

  isAdmin: (): boolean => {
    const user = authService.getCurrentUser();
    // return true;
    return user?.role === "admin";
  },

  initializeAuth: (): { isAuthenticated: boolean; user: User | null } => {
    const isAuthenticated = authService.isAuthenticated();
    const user = isAuthenticated ? authService.getCurrentUser() : null;

    return { isAuthenticated, user };
  },
};
