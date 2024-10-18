import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/SmartLogoWhite.png";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";
import { ChevronFirst, ChevronLast } from "lucide-react";

const Sidebar = ({ items }) => {
  const { logout } = useAuthStore();

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
        <nav className="h-full flex flex-col bg-blue-700">
          <div className="p-4 pb-2 flex justify-center items-center">
            <img src={Logo} alt="Logo" className="w-24 m-3" />
          </div>
          <ul className="flex-l px-3 flex-grow">
            {items.map((item, index) => (
              <SidebarItem
                key={index}
                icon={item.icon}
                text={item.text}
                to={item.to}
              />
            ))}
          </ul>
          <div className="p-4">
            <button
              onClick={handleLogout}
              className="w-full py-2 px-4 bg-white text-blue-700 rounded-md mb-2"
            >
              Logout
            </button>
          </div>
        </nav>
      </aside>
    </div>
  );
};

const SidebarItem = ({ icon, text, to }) => {
  return (
    <li className="relative">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center py-2 px-3 my-1 text-white hover:text-blue-700 hover:rounded-r-full font-medium rounded-md cursor-pointer transition-colors ${
            isActive ? "bg-white text-blue-700" : "hover:bg-white"
          }`
        }
      >
        <div className="bg-white/20 backdrop-blur-xl p-2 rounded-lg">{icon}</div>
        <span className="w-40 ml-3">{text}</span>
      </NavLink>
    </li>
  );
};

export default Sidebar;