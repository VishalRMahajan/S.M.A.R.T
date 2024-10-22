import React, { useEffect, useState } from "react";
import { useAdminStore } from "../../store/AdminStore";
import AddStudentModal from "./AddStudentModal";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const StudentPanel = () => {
  const { Data, getYear, getDepartment, getSemester, getCourse, getStudents } =
    useAdminStore();
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [filteredSemesters, setFilteredSemesters] = useState([]);
  const [filters, setFilters] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const studentsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getYear();
      await getDepartment();
      await getSemester();
      await getCourse();
      setLoading(false);
    };
    fetchData();
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
    const fetchStudents = async () => {
      if (filters.academicYear && filters.department) {
        setLoading(true);
        await getStudents(filters.academicYear, filters.department, filters.semester);
        setLoading(false);
      }
    };
    fetchStudents();
  }, [filters, getStudents]);

  const reloadPage = () => {
    navigate("/");
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

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = Data.Students.sort((a, b) =>
    a.pidNumber.localeCompare(b.pidNumber)
  ).slice(indexOfFirstStudent, indexOfLastStudent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
              {loading
                ? Array.from({ length: studentsPerPage }).map((_, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">
                        <Skeleton />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <Skeleton />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <Skeleton />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <Skeleton />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <Skeleton />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <Skeleton />
                      </td>
                    </tr>
                  ))
                : currentStudents.map((student) => (
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
        <div className="flex justify-center mt-4">
          {Array.from(
            { length: Math.ceil(Data.Students.length / studentsPerPage) },
            (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`py-2 px-4 m-1 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-700 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {index + 1}
              </button>
            )
          )}
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