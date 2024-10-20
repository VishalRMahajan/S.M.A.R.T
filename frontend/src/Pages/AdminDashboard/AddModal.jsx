import React, { useState, useEffect } from "react";
import { useAdminStore } from "../../store/AdminStore";
import toast, { Toaster } from 'react-hot-toast';

const AddModal = ({ mode, onClose }) => {
  const { addYear, addDepartment, addSemester, addCourse, getYear, getDepartment, getSemester, getCourse, Data } = useAdminStore();
  const [formData, setFormData] = useState({});
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [filteredSemesters, setFilteredSemesters] = useState([]);

  useEffect(() => {
    setFormData({});
  }, [mode]);

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
      let response;
      switch (mode) {
        case "Year":
          response = await addYear(formData.year);
          await getYear();
          break;
        case "Department":
          response = await addDepartment(formData.name, formData.code, formData.academicYear);
          await getDepartment();
          break;
        case "Semester":
          response = await addSemester(formData.semester, formData.department, formData.academicYear);
          await getSemester();
          break;
        case "Course":
          response = await addCourse(formData.name, formData.code, formData.semester, formData.department);
          await getCourse();
          break;
        default:
          break;
      }
      if (response && response.success) {
        toast.success(`${mode} added successfully!`);
        onClose();
      } else {
        throw new Error(response.error || 'Failed to add data');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.message || 'Error adding data. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-2xl mb-4">Add {mode}</h2>
        <form onSubmit={handleSubmit}>
          {mode !== "Year" && (
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
          )}
          {mode !== "Year" && mode !== "Department" && (
            <label className="block mb-2">
              Department:
              <select
                name="department"
                value={formData.department || ""}
                onChange={handleChange}
                className="border p-2 w-full"
              >
                <option value="">Select Department</option>
                {filteredDepartments.map((department) => (
                  <option key={department._id} value={department.code}>
                    {department.name}
                  </option>
                ))}
              </select>
            </label>
          )}
          {mode === "Year" && (
            <label className="block mb-2">
              Year:
              <input
                type="text"
                name="year"
                value={formData.year || ""}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </label>
          )}
          {mode === "Department" && (
            <>
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
                Code:
                <input
                  type="text"
                  name="code"
                  value={formData.code || ""}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </label>
            </>
          )}
          {mode === "Semester" && (
            <>
              <label className="block mb-2">
                Semester:
                <input
                  type="number"
                  name="semester"
                  value={formData.semester || ""}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </label>
            </>
          )}
          {mode === "Course" && (
            <>
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
                Code:
                <input
                  type="text"
                  name="code"
                  value={formData.code || ""}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </label>
              <label className="block mb-2">
                Semester:
                <select
                  name="semester"
                  value={formData.semester || ""}
                  onChange={handleChange}
                  className="border p-2 w-full"
                >
                  <option value="">Select Semester</option>
                  {filteredSemesters.map((semester) => (
                    <option key={semester._id} value={semester.semester}>
                      {semester.semester}
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}
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

export default AddModal;