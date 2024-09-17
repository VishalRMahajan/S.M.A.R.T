import React from "react";
import { Check, Slash, Trash2, Type, X } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Ensure you import navigate

const MarkButton = ({ label }) => (
  <button className="bg-gray-100 text-black rounded-full w-10 h-10 flex items-center justify-center border-2 border-purple-200">
    {label}
  </button>
);

const IconButton = ({ icon: Icon, label, color }) => (
  <button
    className="bg-gray-100 text-black rounded-full w-10 h-10 flex items-center justify-center border-2 border-purple-200"
    aria-label={label}
  >
    <Icon className={`text-${color}-500`} />
  </button>
);

const LeftPanel = () => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div>
      <div className="flex flex-col rounded-lg p-4 items-center">
        <p className="text-black font-bold">Drag Marks</p>
        <div className="flex flex-row space-x-6 mt-2">
          <MarkButton label="0" />
          <MarkButton label="1/2" />
        </div>
        <div className="flex flex-row space-x-6 mt-2">
          <MarkButton label="1" />
          <MarkButton label="2" />
        </div>
        <div className="flex flex-row space-x-6 mt-2">
          <MarkButton label="3" />
          <MarkButton label="4" />
        </div>
        <div className="flex flex-row space-x-6 mt-2">
          <MarkButton label="5" />
          <MarkButton label="6" />
        </div>
        <div className="flex flex-row space-x-6 mt-2">
          <MarkButton label="7" />
          <MarkButton label="8" />
        </div>
        <div className="flex flex-row space-x-6 mt-2">
          <MarkButton label="9" />
          <MarkButton label="10" />
        </div>
        <hr className="my-3 border-gray-500 w-full border-1 rounded-full" />
        <div className="flex flex-row space-x-6 mt-1">
          <IconButton icon={Check} label="Check" color="green" />
          <IconButton icon={X} label="Close" color="red" />
        </div>
        <div className="flex flex-row space-x-6 mt-2">
          <IconButton icon={Type} label="Type" color="blue" />
          <IconButton icon={Slash} label="Slash" color="blue" />
        </div>
        <div className="flex flex-row space-x-6 mt-2">
          <IconButton icon={Trash2} label="Trash" color="blue" />
        </div>
        <button
          className="p-2 min-w-max bg-purple-500 hover:bg-purple-900 text-white font-bold rounded-lg mt-5"
          onClick={() => navigate("/")}
        >
          Next Sheet
        </button>
      </div>
    </div>
  );
};

export default LeftPanel;