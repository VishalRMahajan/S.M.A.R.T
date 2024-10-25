import React, { useEffect, useState } from 'react';
import { useAdminStore } from '../../store/AdminStore';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AllocatedPaper = () => {
  const {
    evaluatorProfile,
    Data,
    getEvaluatorProfile,
    getUploadedPapers,
    loading,
    error,
  } = useAdminStore();

  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState('');
  const [allocatedCourses, setAllocatedCourses] = useState([]);
  const [uploadedPapers, setUploadedPapers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getEvaluatorProfile();
      await getUploadedPapers();
    };
    fetchData();
  }, [getEvaluatorProfile, getUploadedPapers]);

  useEffect(() => {
    if (evaluatorProfile) {
      console.log("Evaluator Profile:", evaluatorProfile); // Debug: Check evaluator profile data
      setAllocatedCourses(evaluatorProfile.allocatedcourses);
    }
    if (Data.UploadedPapers) {
      console.log("Uploaded Papers:", Data.UploadedPapers); // Debug: Check uploaded papers data
      setUploadedPapers(Data.UploadedPapers);
    }
  }, [evaluatorProfile, Data.UploadedPapers]);

  const handleChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  const uniqueCourses = () => {
    return allocatedCourses.map(course => course.name);
  };

  const filteredPapers = uploadedPapers.filter(paper => {
    const isCourseAllocated = allocatedCourses.some(course => course._id === paper.course._id);
    const isStudentAllocated = allocatedCourses.some(course =>
      course.allocated.some(allocation =>
        allocation.students.includes(paper.student._id) && allocation.evaluator === evaluatorProfile._id
      )
    );
    return isCourseAllocated && isStudentAllocated && (selectedCourse === '' || paper.course.name === selectedCourse);
  });

  const handleCheckPaper = (filePath) => {
    const fileUrl = filePath.replace('D:\\SMART\\backend', 'http://localhost:5000');
    navigate('/evaluationDashboard', { state: { fileUrl } });
  };

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Allocated Papers</h1>
      
      <div className="flex flex-wrap justify-center mb-4">
        <select
          name="course"
          value={selectedCourse}
          onChange={handleChange}
          className="text-black py-2 px-4 m-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300"
        >
          <option value="">Filter by Course Name</option>
          {uniqueCourses().map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Student Name</th>
                <th className="py-2 px-4 border-b">PID</th>
                <th className="py-2 px-4 border-b">Course Code</th>
                <th className="py-2 px-4 border-b">Course Name</th>
                <th className="py-2 px-4 border-b">Check Paper</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {loading
                ? Array.from({ length: 5 }).map((_, index) => (
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
                    </tr>
                  ))
                : filteredPapers.map((paper) => (
                    <tr key={paper._id}>
                      <td className="py-2 px-4 border-b">{paper.student.name}</td>
                      <td className="py-2 px-4 border-b">{paper.student.pidNumber}</td>
                      <td className="py-2 px-4 border-b">{paper.course.code}</td>
                      <td className="py-2 px-4 border-b">{paper.course.name}</td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => handleCheckPaper(paper.filePath)}
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          Check Paper
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllocatedPaper;