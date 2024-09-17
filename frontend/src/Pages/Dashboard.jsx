import React from "react";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { logout, error } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout Successful");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex justify-center items-center w-full ">
        <div className="w-full max-w-md mt-6 bg-purple-500 bg-opacity-25 backdrop-blur-lg rounded-3xl p-6 shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center  bg-gradient-to-l from-purple-500 to-purple-900 text-transparent bg-clip-text">
            Temporary Dashboard
          </h2>
          <button
            className="w-full p-3 mt-5 bg-purple-500 hover:bg-purple-900 text-white font-bold rounded-lg"
            onClick={() => navigate("/evaluationDashboard")}
          >
            Check Paper
          </button>
          <button
            className="w-full p-3 mt-6 bg-purple-500 hover:bg-purple-900 text-white font-bold rounded-lg"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
