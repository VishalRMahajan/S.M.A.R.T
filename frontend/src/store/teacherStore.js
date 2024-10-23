import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const useTeacherStore = create((set) => ({
  Data: {
    AllocatedPapers: [],
  },
  loading: false,
  error: null,

  getAllocatedPapers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/teacher/allocated-papers`);
      set((state) => ({
        Data: { ...state.Data, AllocatedPapers: response.data.data },
        loading: false,
      }));
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error fetching allocated papers', loading: false });
    }
  },
}));