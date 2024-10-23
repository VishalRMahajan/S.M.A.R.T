import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import { LayoutDashboard, User } from "lucide-react";
import Profile from './Profile';
import { PiExamFill } from "react-icons/pi";
import AllocatedPaper from './AllocatedPaper';

const TeacherDashboard = () => {
  const navbar_items = [
    {
      icon: <LayoutDashboard size={20} />,
      text: "Dashboard",
      to: "/  "
    },
    {
      icon: <User size={20} />,
      text: "Profile",
      to: "/profile"
    },
    {
      icon: <PiExamFill size={20} />,
      text: "Allocated Paper",
      to: "/allocatedPaper"
    },
  ];

  return (
    <DashboardLayout navbar_items={navbar_items}>
      <Routes>
        <Route path="/" element={<h1 className="text-2xl font-bold">Teacher Dashboard</h1>} />
        <Route path="profile" element={<Profile />} />
        <Route path="allocatedPaper" element={<AllocatedPaper />} />
      </Routes>
    </DashboardLayout>
  );
};

export default TeacherDashboard;  