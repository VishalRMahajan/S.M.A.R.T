import { create } from "zustand";
import axios from "axios";
import { updateEvaluator } from "../../../backend/controllers/AdminDashboardController";

const API_URL = "http://localhost:5000/api/admin";

export const useAdminStore = create((set, get) => ({
  evaluators: [],
  error: null,

  getEvaluators: async () => {
    set({ error: null });
    try {
      const response = await axios.get(`${API_URL}/getEvaluator`);
      set({ evaluators: response.data.data });
    } catch (error) {
      console.log(error);
      set({
        error: error.response?.data?.message || "Error fetching evaluators",
      });
    }
  },

  updateEvaluator: async (id, formData) => {
    try {
      const response = await axios.put(`${API_URL}/updateEvaluator`, {
        id,
        ...formData,
      });
      const updatedEvaluator = response.data.data;
      set((state) => ({
        evaluators: state.evaluators.map((evaluator) =>
          evaluator._id === updatedEvaluator._id ? updatedEvaluator : evaluator
        ),
      }));
    } catch (error) {
      console.log(error);
      set({
        error: error.response?.data?.message || "Error updating evaluator",
      });
    }
  },
}));
