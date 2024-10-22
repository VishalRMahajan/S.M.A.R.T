import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const useAdminStore = create((set, get) => ({
  evaluatorProfile: null,
  evaluators: [],
  error: null,
  Data: { Year: [], Departments: [], Semesters: [], Courses: [], Students: [] },

  getEvaluators: async () => {
    set({ error: null });
    try {
      const response = await axios.get(`${API_URL}/admin/getEvaluator`);
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
      const response = await axios.put(`${API_URL}/admin/updateEvaluator`, {
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

  addYear: async (year) => {
    try {
      const response = await axios.post(`${API_URL}/academicYear/add`, { year: year });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response?.data?.message || "Error adding year");
    }
  },

  addDepartment: async (name, code, academicYear) => {
    try {
      const response = await axios.post(`${API_URL}/department/add`, {
        name: name,
        code: code,
        academicYear: academicYear,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response?.data?.error || "Error adding department");
    }
  },

  addSemester: async (semester, department, academicYear) => {
    try {
      const response = await axios.post(`${API_URL}/semester/add`, {
        semester: String(semester),
        department: String(department),
        academicYear: String(academicYear),
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response?.data?.error || "Error adding semester");
    }
  },

  addCourse: async (name, code, semester, department) => {
    try {
      console.log(department)
      const response = await axios.post(`${API_URL}/course/add`, {
        name: name,
        code: code,
        semester: semester,
        department: department,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response?.data?.error || "Error adding course");
    }
  },

  addStudent: async (studentData) => {
    try {
      const { name, pidNumber, department, currentSemester, academicYear } = studentData;
  
      if (!name || !pidNumber || !department || !currentSemester || !academicYear) {
        throw new Error("All fields are required");
      }
  
      const response = await axios.post(`${API_URL}/student/add`, {
        name,
        pidNumber,
        department,
        currentSemester,
        academicYear,
      });

      console.log(response)
  
      set({
        Data: { ...get().Data, Students: [...get().Data.Students, response.data.data] },
      });
  
    } catch (error) {
      console.log(error);
      set({
        error: error.response?.data?.message || "Error adding student",
      });
    }
  },


  getYear: async () => {
    try {
      const yeardata = await axios.get(`${API_URL}/academicYear/get`);
      set({ Data: { ...get().Data, Year: yeardata.data.data } });
    } catch (error) {
      console.log(error);
      set({
        error: error.response?.data?.message || "Error fetching Year",
      });
    }
  },

  getDepartment: async () => {
    try {
      const departmentdata = await axios.get(`${API_URL}/department/`);
      set({ Data: { ...get().Data, Departments: departmentdata.data.data } });
    } catch (error) {
      console.log(error);
      set({
        error: error.response?.data?.message || "Error fetching Department",
      });
    }
  },

  getSemester: async () => {
    try {
      const semesterdata = await axios.get(`${API_URL}/semester/`);
      set({ Data: { ...get().Data, Semesters: semesterdata.data.data } });
    } catch (error) {
      console.log(error);
      set({
        error: error.response?.data?.message || "Error fetching Semester",
      });
    }
  },

  getCourse: async () => {
    try {
      const coursedata = await axios.get(`${API_URL}/course`);
      set({ Data: { ...get().Data, Courses: coursedata.data.data } });
    } catch (error) {
      console.log(error);
      set({
        error: error.response?.data?.message || "Error fetching Courses",
      });
    }
  },

  getStudents: async (academicYear, department, semester) => {
    try {
      const params = { academicYear };
      if (department) params.department = department;
      if (semester) params.semester = semester;

      const response = await axios.get(`${API_URL}/student/`, { params });
      console.log(response)
      set({ Data: { ...get().Data, Students: response.data.data } });
    } catch (error) {
      console.log(error);
      set({
        error: error.response?.data?.message || "Error fetching students",
      });
    }
  },

  allocateCourseToEvaluator: async (evaluatorId, courseIds) => {
    try {
      const response = await axios.post(`${API_URL}/admin/allocatecourse`, {
        evaluatorId,
        courseIds,
      });
      console.log(response)
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response?.data?.message || "Error allocating courses");
    }
  },
  getEvaluatorProfile: async () => {
    set({ error: null });
    try {
      const response = await axios.get(`${API_URL}/admin/profile`);
      set({ evaluatorProfile: response.data.data });
    } catch (error) {
      console.log(error);
      set({
        error: error.response?.data?.message || "Error fetching evaluator profile",
      });
    }
  },
}));