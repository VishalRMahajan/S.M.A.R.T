import React, { useEffect, useState } from 'react';
import { useAdminStore } from '../../store/AdminStore';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { toast, Toaster } from 'react-hot-toast';

const AdminUploadPage = () => {
  const {
    Data,
    getYear,
    getDepartment,
    getSemester,
    getCourse,
    getStudents,
    getEvaluatorsByCourse,
    getUploadedPapers,
    uploadPaper,
    loading,
    error,
  } = useAdminStore();

  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [filteredSemesters, setFilteredSemesters] = useState([]);
  const [filters, setFilters] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedEvaluator, setSelectedEvaluator] = useState('');
  const [file, setFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [uploadStatus, setUploadStatus] = useState('all');
  const studentsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await getYear();
      await getDepartment();
      await getSemester();
      await getCourse();
      await getUploadedPapers();
    };
    fetchData();
  }, [getYear, getDepartment, getSemester, getCourse, getUploadedPapers]);

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
        await getStudents(filters.academicYear, filters.department, filters.semester);
      }
    };
    fetchStudents();
  }, [filters, getStudents]);

  useEffect(() => {
    const fetchEvaluators = async () => {
      if (filters.course) {
        await getEvaluatorsByCourse(filters.course);
      }
    };
    fetchEvaluators();
  }, [filters.course, getEvaluatorsByCourse]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleUpload = async () => {
    if (!file || !selectedStudent || !selectedEvaluator) {
      toast.error('Please fill all fields before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('studentId', selectedStudent._id);
    formData.append('courseId', filters.course);
    formData.append('evaluatorId', selectedEvaluator);
    formData.append('year', filters.academicYear);
    formData.append('department', filters.department);
    formData.append('semester', filters.semester);
    formData.append('paper', file);

    try {
      await uploadPaper(formData);
      setSelectedStudent(null);
      setSelectedEvaluator('');
      setFile(null);
      toast.success('Paper uploaded successfully!');
      await getUploadedPapers();
    } catch (error) {
      console.error('Error uploading paper:', error);
      toast.error('Error uploading paper');
    }
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = Data.Students.slice(indexOfFirstStudent, indexOfLastStudent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const isStudentUploadedForCourse = (studentId, courseId) => {
    return Data.UploadedPapers.some(paper => paper.student._id === studentId && paper.course._id === courseId);
  };

  const filteredStudents = currentStudents.filter(student => {
    if (uploadStatus === 'uploaded') {
      return isStudentUploadedForCourse(student._id, filters.course);
    } else if (uploadStatus === 'not_uploaded') {
      return !isStudentUploadedForCourse(student._id, filters.course);
    }
    return true;
  });

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Upload Papers</h1>
      <div className="flex flex-wrap justify-center mb-4">
        <select
          name="academicYear"
          value={filters.academicYear || ''}
          onChange={handleChange}
          className="text-black py-2 px-4 m-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300"
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
          value={filters.department || ''}
          onChange={handleChange}
          className="text-black py-2 px-4 m-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300"
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
          value={filters.semester || ''}
          onChange={handleChange}
          className="text-black py-2 px-4 m-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300"
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
      <div className="flex flex-wrap justify-center mb-4">
        <select
          name="course"
          value={filters.course || ''}
          onChange={handleChange}
          className="text-black py-2 px-4 m-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300"
          disabled={!filters.semester}
        >
          <option value="">Select Course</option>
          {Data.Courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.name}
            </option>
          ))}
        </select>
        <select
          name="uploadStatus"
          value={uploadStatus}
          onChange={(e) => setUploadStatus(e.target.value)}
          className="text-black py-2 px-4 m-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300"
        >
          <option value="all">All</option>
          <option value="uploaded">Uploaded</option>
          <option value="not_uploaded">Not Uploaded</option>
        </select>
      </div>
      <div className="mt-4">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">PID</th>
                <th className="py-2 px-4 border-b">Semester</th>
                <th className="py-2 px-4 border-b">Department</th>
                <th className="py-2 px-4 border-b">Acad.Year</th>
                <th className="py-2 px-4 border-b">Upload</th>
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
                : filteredStudents.map((student) => (
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
                        {isStudentUploadedForCourse(student._id, filters.course) ? (
                          <button
                            onClick={() => {
                              if (filters.course) {
                                setSelectedStudent(student);
                              } else {
                                toast.error('Please select a course first');
                              }
                            }}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                          >
                            Reupload
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              if (filters.course) {
                                setSelectedStudent(student);
                              } else {
                                toast.error('Please select a course first');
                              }
                            }}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                          >
                            Upload
                          </button>
                        )}
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
                    ? 'bg-blue-700 text-white'
                    : 'bg-gray-300 text-black'
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
      {selectedStudent && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg relative flex flex-col items-center w-96">
            <h2 className="text-xl font-bold mb-4">Upload Answer Sheet</h2>
            <p className="mb-2"><strong>Uploading for:</strong> {selectedStudent.name}</p>
            <p className="mb-2"><strong>Course Name:</strong> {filters.course ? Data.Courses.find(course => course._id === filters.course)?.name : ''}</p>
            <select
              name="evaluator"
              value={selectedEvaluator}
              onChange={(e) => setSelectedEvaluator(e.target.value)}
              className="text-black py-2 px-4 m-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 w-full"
            >
              <option value="">Select Evaluator</option>
              {Data.EvaluatorsByCourse.map((evaluator) => (
                <option key={evaluator.evaluator._id} value={evaluator.evaluator._id}>
                  {evaluator.evaluator.name}
                </option>
              ))}
            </select>
            <div className="border-dashed border-2 border-gray-400 p-4 rounded-lg cursor-pointer mb-4 w-full">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="block text-center">
                {file ? file.name : 'Drag and drop a file or click to select'}
              </label>
            </div>
            <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-2">
              Upload
            </button>
            <button onClick={() => setSelectedStudent(null)} className="bg-gray-500 text-white px-4 py-2 rounded w-full">
              Go Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUploadPage;