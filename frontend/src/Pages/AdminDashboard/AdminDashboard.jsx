import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../../components/Dashboard/DashboardLayout'; 
import { FaHome,FaChalkboardTeacher ,FaUpload   } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import EvaluatorData from './EvaluatorData';
import AdminPanel from './AdminPanel';
import StudentPanel from './StudentPanel';
import AdminUploadPage from './AdminUploadPage';

const AdminDashboard = () => {
  const navbar_items = [
    {
      icon: <MdAdminPanelSettings  size={20} />,
      text: "Admin Panel",
      to: "/adminDashboard/"
    },
    {
      icon: <FaChalkboardTeacher  size={20} />,
      text: "Evaluator",
      to: "/adminDashboard/evaluator"
    },
    {
      icon: <PiStudentFill  size={20} />,
      text: "Student",
      to: "/adminDashboard/student"
    },
    {
      icon: <FaUpload   size={20} />,
      text: "Upload",
      to: "/adminDashboard/upload"
    },
  ];

  return (
    <DashboardLayout navbar_items={navbar_items}>
      <Routes>
        <Route path="evaluator" element={<EvaluatorData />} />
        <Route path="/" element={<AdminPanel />} />
        <Route path="student" element={<StudentPanel />} />
        <Route path="upload" element={<AdminUploadPage />} />
      </Routes>
    </DashboardLayout>
  );
};

export default AdminDashboard;