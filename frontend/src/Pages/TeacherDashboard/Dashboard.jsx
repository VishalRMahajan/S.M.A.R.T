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
      icon: <PiExamFill size={20} />,
      text: "Allocated Paper",
      to: "/"
    },
    {
      icon: <User size={20} />,
      text: "Profile",
      to: "/profile"
    },
    
  ];

  return (
    <DashboardLayout navbar_items={navbar_items}>
      <Routes>
        <Route path="profile" element={<Profile />} />
        <Route path="/" element={<AllocatedPaper />} />
      </Routes>
    </DashboardLayout>
  );
};

export default TeacherDashboard;  