import React from "react";
import { useEvaluatorStore } from "../../store/evaluatorStore";

const MarksTable = () => {
  const { questions, examType, totalMarks, optionalQuestions } =
    useEvaluatorStore();

  const questionKeys =
    examType === "MSE"
      ? ["Q1a", "Q1b", "Q2a", "Q2b", "Q3a", "Q3b"]
      : ["Q1a", "Q1b", "Q2a", "Q2b", "Q3a", "Q3b", "Q4a", "Q4b", "Q5a", "Q5b"];

  const renderRows = () => {
    const rows = [];
    const numQuestions = examType === "MSE" ? 3 : 5;

    for (let i = 1; i <= numQuestions; i++) {
      const questionA = `Q${i}a`;
      const questionB = `Q${i}b`;

      const totalMarks =
        questions[questionA].marks + questions[questionB].marks;

      rows.push(
        <tr key={`Q${i}`} className="border-b hover:bg-gray-50">
          <td className="border px-4 py-2 text-black">Q{i}</td>
          <td className="border px-4 py-2 text-black">
            {questions[questionA].marks}
          </td>
          <td className="border px-4 py-2 text-black">
            {questions[questionB].marks}
          </td>
          <td className="border px-4 py-2 text-black">{totalMarks}</td>
        </tr>
      );
    }
    return rows;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border-2 border-gray-300 shadow ">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left text-gray-600 font-semibold">
              Question
            </th>
            <th className="border px-4 py-2 text-left text-gray-600 font-semibold">
              Part A
            </th>
            <th className="border px-4 py-2 text-left text-gray-600 font-semibold">
              Part B
            </th>
            <th className="border px-4 py-2 text-left text-gray-600 font-semibold">
              Total
            </th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
      {examType === "MSE" ? (
        <p className="text-black items-center justify-center flex mt-1 font-bold">
          Total Marks: {totalMarks} / 20
        </p>
      ) : (
        <p className="text-black items-center justify-center flex mt-1 font-bold">
          Total Marks: {totalMarks} / 60
        </p>
      )}
      <p className="text-black items-center justify-center flex mt-1 font-bold">
        Question Considered as Optional is {optionalQuestions}{" "}
      </p>
    </div>
  );
};

export default MarksTable;
