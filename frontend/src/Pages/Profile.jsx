import React, { useEffect } from 'react';
import { useAdminStore } from '../store/AdminStore';

const Profile = () => {
  const { evaluatorProfile, getEvaluatorProfile, error } = useAdminStore();

  useEffect(() => {
    getEvaluatorProfile();
  }, [getEvaluatorProfile]);

  if (error) {
    return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
  }

  if (!evaluatorProfile) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 flex items-center justify-center p-4 max-h-screen">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-full h-fit max-w-4xl">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex-shrink-0">
            {/* Will add Profile Pic Functionality at end*/}
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-1">{evaluatorProfile.name}</h1>
            <p className="text-lg text-gray-600"><strong>Email:</strong> {evaluatorProfile.email}</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Allocated Courses: </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {evaluatorProfile.allocatedcourses.map(course => (
              <div key={course._id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <p className="text-gray-800 font-semibold">{course.code} - {course.name}</p>
                <p className="text-gray-600">Semester: {course.semester.semester}</p>
                <p className="text-gray-600">Department: {course.semester.department.name}</p>
                <p className="text-gray-600">Academic Year: {course.semester.department.academicYear.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;