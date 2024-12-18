import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isCheckingAuth: true,
  role: "evaluator",

  signup: async (email, password, name) => {
    set({ error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        name,
      });
      set({
        user: response.data.data.user,
        isAuthenticated: true,
        error: null,
      });
    } catch (error) {
      set({ error: error.response.data.message || "Error signing up" });
      throw error;
    }
  },

  verifyemail: async (email, verificationToken) => {
    set({ error: null });
    try {
      const response = await axios.post(`${API_URL}/verifyemail`, {
        email,
        verificationToken,
      });
      set({
        user: response.data.data.user,
        isAuthenticated: true,
        error: null,
      });
    } catch (error) {
      set({ error: error.response.data.message || "Error Verifying Email" });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/check-auth`);
      set({
        user: response.data.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ isCheckingAuth: false });
    }
  },

  login: async (email, password) => {
    set({ error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      set({
        user: response.data.data.user,
        isAuthenticated: true,
        error: null,
      });
    } catch (error) {
      set({ error: error.response.data.message || "Unexpected Login Error" });
      throw error;
    }
  },

  logout: async () => {
    set({ error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({ user: null, isAuthenticated: false, error: null });
    } catch (error) {
      set({ error: error.response.data.message || "Error logging out" });
      throw error;
    }
  },

  forgotPassword: async (email) => {
    set({ error: null });
    try {
      await axios.post(`${API_URL}/forgotpassword`, { email });
    } catch (error) {
      set({ error: error.response.data.message || "Unexpected Error" });
      throw error;
    }
  },

  resetpassword: async (token, password) => {
    set({ error: null });
    try {
      await axios.post(`${API_URL}/resetpassword/${token}`, {
        password,
      });
    } catch (error) {
      set({ error: error.response.data.message || "Error Reseting Password" });
      throw error;
    }
  },

  checkRole: async () => {
    set({ error: null });
    try {
      const response = await axios.post(`${API_URL}/check-role`);
      set({ role: response.data.role });
    } catch (error) {
      set({ error: error.response.data.message || "Error checking role" });
      throw error;
    }
  },
}));
