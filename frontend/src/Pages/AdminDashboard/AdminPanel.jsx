import React, { useEffect, useState } from "react";
import { useAdminStore } from "../../store/AdminStore";
import AddModal from "./AddModal";

const AdminPanel = () => {
  const { getYear, getDepartment, getSemester, getCourse, Data, error } = useAdminStore();
  const [mode, setMode] = useState("Year");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async (fetchFunction) => {
    try {
      await fetchFunction();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(getYear);
    fetchData(getDepartment);
    fetchData(getSemester);
    fetchData(getCourse);
  }, []);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>
      <div className="flex justify-center mb-4">
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="text-black py-2 px-4 m-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 border border-black"
        >
          <option value="Year">Year</option>
          <option value="Department">Department</option>
          <option value="Semester">Semester</option>
          <option value="Course">Course</option>
        </select>
        <button
          onClick={handleAddClick}
          className="bg-blue-700 text-white py-2 px-4 m-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Add {mode}
        </button>
      </div>
      <div className="mt-4">
        <div className="overflow-x-auto">
          {mode === "Year" && Data.Year.length > 0 && (
            <table className="min-w-full bg-white border border-gray-200 justify-center">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b w-1/4">Year</th>
                  <th className="py-2 px-4 border-b w-3/4">Departments</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {Data.Year.map((year) => (
                  <tr key={year._id}>
                    <td className="py-2 px-4 border-b">{year.year}</td>
                    <td className="py-2 px-4 border-b">
                      {year.departments.map((dept) => dept.name).join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {mode === "Department" && Data.Departments.length > 0 && (
            <table className="min-w-full bg-white border border-gray-200 justify-center">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b w-1/4">Name</th>
                  <th className="py-2 px-4 border-b w-1/4">Code</th>
                  <th className="py-2 px-4 border-b w-1/4">Academic Year</th>
                  <th className="py-2 px-4 border-b w-1/4">Semesters</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {Data.Departments.map((department) => (
                  <tr key={department._id}>
                    <td className="py-2 px-4 border-b">{department.name}</td>
                    <td className="py-2 px-4 border-b">{department.code}</td>
                    <td className="py-2 px-4 border-b">{department.academicYear.year}</td>
                    <td className="py-2 px-4 border-b">
                      {department.semesters.map((sem) => sem.semester).join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {mode === "Semester" && Data.Semesters.length > 0 && (
            <table className="min-w-full bg-white border border-gray-200 justify-center">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Semester</th>
                  <th className="py-2 px-4 border-b w-1/4">Department</th>
                  <th className="py-2 px-4 border-b w-1/4">Academic Year</th>
                  <th className="py-2 px-4 border-b w-1/2">Courses</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {Data.Semesters.map((semester) => (
                  <tr key={semester._id}>
                    <td className="py-2 px-4 border-b">{semester.semester}</td>
                    <td className="py-2 px-4 border-b">{semester.department.name}</td>
                    <td className="py-2 px-4 border-b">{semester.department.academicYear.year}</td>
                    <td className="py-2 px-4 border-b">
                      {semester.courses.map((course) => course.name).join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {mode === "Course" && Data.Courses.length > 0 && (
            <table className="min-w-full bg-white border border-gray-200 justify-center">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b w-1/5">Name</th>
                  <th className="py-2 px-4 border-b w-1/5">Code</th>
                  <th className="py-2 px-4 border-b w-1/5">Semester</th>
                  <th className="py-2 px-4 border-b w-1/5">Department</th>
                  <th className="py-2 px-4 border-b w-1/5">Academic Year</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {Data.Courses.map((course) => (
                  <tr key={course._id}>
                    <td className="py-2 px-4 border-b">{course.name}</td>
                    <td className="py-2 px-4 border-b">{course.code}</td>
                    <td className="py-2 px-4 border-b">{course.semester.semester}</td>
                    <td className="py-2 px-4 border-b">{course.semester.department.name}</td>
                    <td className="py-2 px-4 border-b">{course.semester.department.academicYear.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {isModalOpen && (
        <AddModal
          mode={mode}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default AdminPanel;