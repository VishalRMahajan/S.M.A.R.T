import React from "react";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import Sidebar from "../components/Dashboard/sidebar";  
import { Home, LayoutDashboard, User } from "lucide-react";

const Dashboard = () => {
  const { logout, error } = useAuthStore();

  const navbar_items = [
    {
      icon: <LayoutDashboard size={20} />,
      text: "Dashboard",
      active: false,
    },
    {
      icon: <User size={20} />,
      text: "Profile",
      active: false,
    },
  ]

  return (
    <div className="flex bg-purple-500">
       <Sidebar items={navbar_items} />
      <div className="w-full bg-white m-5 rounded-3xl">
        Evaluator Dashboard
      </div>
    </div>
  );
};

export default Dashboard;
