import React from "react";
import {useEvaluatorStore} from "../../store/evaluatorStore";

const SelectQuestionButton = ({ label }) => {
  const { setSelectedQuestion, selectedButton, setSelectedButton } = useEvaluatorStore();

  const handleClick = (question) => {
    setSelectedQuestion(question);
    setSelectedButton(question);
    console.log(question);
  };

  return (
    <div className="flex items-center space-x-4 mt-2">
      <p className="text-lg text-black font-bold">{label}</p>
      <button
        className={`${
          selectedButton === `${label}a` ? "bg-purple-500 text-white" : "bg-gray-100 text-black"
        } rounded-full w-10 h-10 flex items-center justify-center border-2 border-purple-200`}
        onClick={() => handleClick(`${label}a`)}
      >
        a
      </button>
      <button
        className={`${
          selectedButton === `${label}b` ? "bg-purple-500 text-white" : "bg-gray-100 text-black"
        } rounded-full w-10 h-10 flex items-center justify-center border-2 border-purple-200`}
        onClick={() => handleClick(`${label}b`)}
      >
        b
      </button>
    </div>
  );
};

export default SelectQuestionButton;