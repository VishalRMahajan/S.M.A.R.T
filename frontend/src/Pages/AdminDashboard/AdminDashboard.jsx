import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../../components/Dashboard/DashboardLayout'; 
import { FaHome,FaChalkboardTeacher   } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import EvaluatorData from './EvaluatorData';
import AdminPanel from './AdminPanel';
import StudentPanel from './StudentPanel';

const AdminDashboard = () => {
  const navbar_items = [
    {
      icon: <FaHome  size={20} />,
      text: "Home",
      to: "/adminDashboard"
    },
    
    {
      icon: <MdAdminPanelSettings  size={20} />,
      text: "Admin Panel",
      to: "/adminDashboard/adminPanel"
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
  ];

  return (
    <DashboardLayout navbar_items={navbar_items}>
      <Routes>
        <Route path="/" element={<h1 className="text-2xl font-bold">Admin Dashboard</h1>} />
        <Route path="evaluator" element={<EvaluatorData />} />
        <Route path="adminPanel" element={<AdminPanel />} />
        <Route path="student" element={<StudentPanel />} />
      </Routes>
    </DashboardLayout>
  );
};

export default AdminDashboard;