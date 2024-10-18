import React, { useState } from "react";
import SelectQuestionButton from "./SelectQuestionButton";
import MarksTable from "./MarksTable";
import { useEvaluatorStore } from "../../store/evaluatorStore";
import { useNavigate } from "react-router-dom";

const RightPanel = () => {
  const { examType, setExamType, selectedQuestion } = useEvaluatorStore();
  const navigate = useNavigate();

  const handleExamTypeChange = (event) => {
    setExamType(event.target.value);
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        <select
          className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg 
          focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 mt-4 shadow"
          onChange={handleExamTypeChange}
        >
          <option value="" disabled>
            Select Paper Pattern
          </option>
          <option value="MSE">MSE</option>
          <option value="ESE">ESE</option>
        </select>
      </div>
      <p className="text-black font-bold mt-2 text-center">
        {" "}
        You are currently evaluating : {selectedQuestion}
      </p>
      <div>
        {examType === "MSE" && (
          <div className="flex items-center flex-col">
            <div className="p-4 flex items-center flex-col">
              <SelectQuestionButton label="Q1" />
              <SelectQuestionButton label="Q2" />
              <SelectQuestionButton label="Q3" />
            </div>
          </div>
        )}
        {examType === "ESE" && (
          <div className="flex items-center flex-row">
            <div className="p-4 flex items-center flex-col">
              <SelectQuestionButton label="Q1" />
              <SelectQuestionButton label="Q2" />
              <SelectQuestionButton label="Q3" />
            </div>
            <div className="p-4 flex items-center flex-col">
              <SelectQuestionButton label="Q4" />
              <SelectQuestionButton label="Q5" />
            </div>
          </div>
        )}
      </div>

      <MarksTable />
      <div className="flex flex-row space-x-4 items-center justify-center">
        <button
          className="p-2 w-36 bg-purple-500 hover:bg-purple-900 text-white font-bold rounded-lg mt-5"
          onClick={() => navigate("/")}
        >
          Finish Evaluation
        </button>
        <button
          className="p-2 w-36 bg-purple-500 hover:bg-purple-900 text-white font-bold rounded-lg mt-5"
          onClick={() => navigate("/")}
        >
          Next Sheet
        </button>
      </div>
    </div>
  );
};

export default RightPanel;
