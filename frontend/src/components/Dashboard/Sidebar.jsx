import React, { useState } from "react";
import Logo from "../../assets/SmartLogoWhite.png";
import { ChevronFirst, ChevronLast } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast"

const Sidebar = ({ items }) => {
  const {logout} = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout Successful");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <aside className="h-screen w-64 flex flex-col justify-between">
        <nav className="h-full flex flex-col bg-purple-500">
          <div className="p-4 pb-2 flex justify-center items-center">
            <img src={Logo} alt="Logo" className="w-24 m-3" />
          </div>
          <ul className="flex-l px-3 flex-grow">
            {items.map((item, index) => (
              <SidebarItem
                key={index}
                icon={item.icon}
                text={item.text}
                active={item.active}
              />
            ))}
          </ul>
          <div className="p-4">
            <button onClick={handleLogout}className="w-full py-2 px-4 bg-white text-purple-500 rounded-md mb-2">
              Logout
            </button>
          </div>
        </nav>
      </aside>
    </div>
  );
};

const SidebarItem = ({ icon, text, active }) => {
  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 text-white hover:text-purple-500 hover:rounded-r-full font-medium rounded-md cursor-pointer  transition-colors
      ${active ? "bg-white" : "hover:bg-white"}`}
    >
      <div className="bg-white/20 backdrop-blur-xl p-2 rounded-lg">{icon}</div>
      <span className="w-40 ml-3 hover:text-purple-500">{text}</span>
    </li>
  );
};

export default Sidebar;