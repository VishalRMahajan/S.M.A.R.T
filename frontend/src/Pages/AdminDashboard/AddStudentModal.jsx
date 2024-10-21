import React, { useState, useEffect } from 'react';
import { useAdminStore } from "../../store/AdminStore";
import toast, { Toaster } from 'react-hot-toast';

const AddStudentModal = ({ onClose, onStudentAdded }) => {
  const { addStudent, getYear, getDepartment, getSemester, Data } = useAdminStore();
  const [formData, setFormData] = useState({});
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [filteredSemesters, setFilteredSemesters] = useState([]);

  useEffect(() => {
    getYear();
    getDepartment();
    getSemester();
  }, []);

  useEffect(() => {
    if (formData.academicYear) {
      const departments = Data.Departments.filter(
        (dept) => dept.academicYear.year === formData.academicYear
      );
      setFilteredDepartments(departments);
    } else {
      setFilteredDepartments([]);
    }
  }, [formData.academicYear, Data.Departments]);

  useEffect(() => {
    if (formData.academicYear && formData.department) {
      const semesters = Data.Semesters.filter(
        (sem) => sem.department.code === formData.department && sem.department.academicYear.year === formData.academicYear
      );
      setFilteredSemesters(semesters);
    } else {
      setFilteredSemesters([]);
    }
  }, [formData.academicYear, formData.department, Data.Semesters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addStudent(formData);
      toast.success('Student added successfully!');
      onStudentAdded(); // Call the callback to refresh the student list
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error adding student:", error);
      toast.error('Error adding student. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <Toaster />
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-2xl mb-4">Add Student</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            PID Number:
            <input
              type="text"
              name="pidNumber"
              value={formData.pidNumber || ""}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            Academic Year:
            <select
              name="academicYear"
              value={formData.academicYear || ""}
              onChange={handleChange}
              className="border p-2 w-full"
            >
              <option value="">Select Year</option>
              {Data.Year.map((year) => (
                <option key={year._id} value={year.year}>
                  {year.year}
                </option>
              ))}
            </select>
          </label>
          <label className="block mb-2">
            Department:
            <select
              name="department"
              value={formData.department || ""}
              onChange={handleChange}
              className="border p-2 w-full"
              disabled={!formData.academicYear}
            >
              <option value="">Select Department</option>
              {filteredDepartments.map((department) => (
                <option key={department._id} value={department.code}>
                  {department.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block mb-2">
            Semester:
            <select
              name="currentSemester"
              value={formData.currentSemester || ""}
              onChange={handleChange}
              className="border p-2 w-full"
              disabled={!formData.department}
            >
              <option value="">Select Semester</option>
              {filteredSemesters.map((semester) => (
                <option key={semester._id} value={semester.semester}>
                  {semester.semester}
                </option>
              ))}
            </select>
          </label>
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 w-1/2 mr-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 w-1/2 rounded"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentModal;