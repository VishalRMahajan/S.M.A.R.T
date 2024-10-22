import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/SmartLogoWhite.png";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";
import { ChevronFirst, ChevronLast } from "lucide-react";

const DashboardLayout = ({ navbar_items, children }) => {
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
    <div className="flex bg-blue-800">
      <Sidebar items={navbar_items} handleLogout={handleLogout} />
      <div className="w-full bg-white m-5 rounded-3xl p-5">{children}</div>
    </div>
  );
};

const Sidebar = ({ items, handleLogout }) => {
  return (
    <div>
      <aside className="h-screen w-64 flex flex-col justify-between">
        <nav className="h-full flex flex-col bg-blue-800">
          <div className="p-4 pb-2 flex justify-center items-center">
            <img src={Logo} alt="Logo" className="w-32 m-3 mt-5" />
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
              className="w-full py-2 px-4 bg-white text-blue-700 font-bold rounded-md mb-4 justify-end"
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
        end
        className={({ isActive }) =>
          `flex items-center py-2 px-3  mt-2 font-medium rounded-md cursor-pointer transition-colors ${
            isActive
              ? "bg-white text-blue-700 rounded-xl shadow-lg"
              : "text-white hover:text-blue-700 hover:bg-white/80 hover:rounded-xl"
          }`
        }
      >
        <div className="bg-white/20 backdrop-blur-xl p-2 rounded-lg">
          {icon}
        </div>
        <span className="w-40 ml-3">{text}</span>
      </NavLink>
    </li>
  );
};

export default DashboardLayout;
