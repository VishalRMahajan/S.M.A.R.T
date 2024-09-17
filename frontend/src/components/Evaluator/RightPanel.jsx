import React, { useState } from "react";
import SelectQuestionButton from "./SelectQuestionButton";

const RightPanel = () => {
  const [examType, setExamType] = useState("MSE");

  const handleExamTypeChange = (event) => {
    setExamType(event.target.value);
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        <p className="text-black font-bold">Drag Marks</p>
        <select
          className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg 
          focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 mt-4 shadow"
          value={examType}
          onChange={handleExamTypeChange}
        >
          <option value="" disabled>
            Select Paper Pattern
          </option>
          <option value="MSE">MSE</option>
          <option value="ESE">ESE</option>
        </select>
      </div>

      <div>
        {examType === "MSE" && (
          <div className="p-4 flex items-center flex-col">
            <div className="p-4 flex items-center flex-col">
              <SelectQuestionButton label="Q1" />
              <SelectQuestionButton label="Q2" />
              <SelectQuestionButton label="Q3" />
            </div>
          </div>
        )}
        {examType === "ESE" && (
          <div className="p-4 flex items-center flex-row">
            <div className="p-4 flex items-center flex-col">
              <SelectQuestionButton label="Q1" />
              <SelectQuestionButton label="Q2" />
              <SelectQuestionButton label="Q3" />
            </div>
            <div className="p-4 flex items-center flex-col">
              <SelectQuestionButton label="Q4" />
              <SelectQuestionButton label="Q5" />
              <SelectQuestionButton label="Q6" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightPanel;
