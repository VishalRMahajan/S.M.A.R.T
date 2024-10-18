import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../../components/Dashboard/DashboardLayout'; 
import { FaHome,FaChalkboardTeacher  } from "react-icons/fa";
import EvaluatorData from './EvaluatorData';

const AdminDashboard = () => {
  const navbar_items = [
    {
      icon: <FaHome  size={20} />,
      text: "Home",
      to: "/adminDashboard"
    },
    {
      icon: <FaChalkboardTeacher  size={20} />,
      text: "Evaluator",
      to: "/adminDashboard/evaluator"
    },
  ];

  return (
    <DashboardLayout navbar_items={navbar_items}>
      <Routes>
        <Route path="/" element={<h1 className="text-2xl font-bold">Admin Dashboard</h1>} />
        <Route path="evaluator" element={<EvaluatorData />} />
      </Routes>
    </DashboardLayout>
  );
};

export default AdminDashboard;