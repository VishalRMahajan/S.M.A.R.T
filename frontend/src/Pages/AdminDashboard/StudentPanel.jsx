import React, { useEffect, useState } from "react";
import { useAdminStore } from "../../store/AdminStore";
import AddStudentModal from "./AddStudentModal";
import { useNavigate } from "react-router-dom";

const StudentPanel = () => {
  const { Data, getYear, getDepartment, getSemester, getCourse, getStudents } =
    useAdminStore();
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [filteredSemesters, setFilteredSemesters] = useState([]);
  const [filters, setFilters] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getYear();
    getDepartment();
    getSemester();
    getCourse();
  }, []);

  useEffect(() => {
    if (filters.academicYear) {
      const departments = Data.Departments.filter(
        (dept) => dept.academicYear?.year === filters.academicYear
      );
      setFilteredDepartments(departments);
    } else {
      setFilteredDepartments([]);
    }
  }, [filters.academicYear, Data.Departments]);

  useEffect(() => {
    if (filters.academicYear && filters.department) {
      const semesters = Data.Semesters.filter(
        (sem) =>
          sem.department?.code === filters.department &&
          sem.department?.academicYear?.year === filters.academicYear
      );
      setFilteredSemesters(semesters);
    } else {
      setFilteredSemesters([]);
    }
  }, [filters.academicYear, filters.department, Data.Semesters]);

  useEffect(() => {
    if (filters.academicYear && filters.department) {
      getStudents(filters.academicYear, filters.department, filters.semester);
    }
  }, [filters, getStudents]);

  const reloadPage = () => {
    navigate("/")
    navigate("/adminDashboard/student");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleStudentAdded = () => {
    getStudents(filters.academicYear, filters.department, filters.semester);
    setIsModalOpen(false);
    reloadPage();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">
        Student Management Panel
      </h1>
      <div className="flex justify-center mb-4">
        <button
          onClick={handleAddClick}
          className="bg-blue-700 text-white py-2 px-4 m-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Add Student
        </button>
      </div>
      <div className="flex justify-center mb-4">
        <select
          name="academicYear"
          value={filters.academicYear || ""}
          onChange={handleChange}
          className="text-black py-2 px-4 m-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 border border-black"
        >
          <option value="">Select Year</option>
          {Data.Year.map((year) => (
            <option key={year._id} value={year.year}>
              {year.year}
            </option>
          ))}
        </select>
        <select
          name="department"
          value={filters.department || ""}
          onChange={handleChange}
          className="text-black py-2 px-4 m-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 border border-black"
          disabled={!filters.academicYear}
        >
          <option value="">Select Department</option>
          {filteredDepartments.map((department) => (
            <option key={department._id} value={department.code}>
              {department.name}
            </option>
          ))}
        </select>
        <select
          name="semester"
          value={filters.semester || ""}
          onChange={handleChange}
          className="text-black py-2 px-4 m-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 border border-black"
          disabled={!filters.department}
        >
          <option value="">Select Semester</option>
          {filteredSemesters.map((semester) => (
            <option key={semester._id} value={semester.semester}>
              {semester.semester}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 justify-center">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b ">Name</th>
                <th className="py-2 px-4 border-b ">PID</th>
                <th className="py-2 px-4 border-b ">Semester</th>
                <th className="py-2 px-4 border-b ">Department</th>
                <th className="py-2 px-4 border-b ">Acad.Year</th>
                <th className="py-2 px-4 border-b ">Courses</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {Data.Students.map((student) => (
                <tr key={student._id}>
                  <td className="py-2 px-4 border-b">{student.name}</td>
                  <td className="py-2 px-4 border-b">{student.pidNumber}</td>
                  <td className="py-2 px-4 border-b">
                    {student.currentSemester?.semester}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {student.department?.code}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {student.department?.academicYear?.year}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {student.currentSemester?.courses
                      ?.map((course) => course.name)
                      .join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <AddStudentModal
          onClose={handleCloseModal}
          onStudentAdded={handleStudentAdded}
        />
      )}
    </div>
  );
};

export default StudentPanel;
