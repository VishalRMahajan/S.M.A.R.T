import React from 'react'
import LeftPanel from '../../components/Evaluator/LeftPanel'
import RightPanel from '../../components/Evaluator/RightPanel'
import { useNavigate } from 'react-router-dom'
import PDFViewer from '../../components/Evaluator/PDFViewer'



const EvaluationDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-gray-200">
      {/* Header */}
      <header className="bg-white  rounded-3xl m-2 text-white p-4  shadow h-16">
        <div className="flex flex-row justify-between items-center h-full">
          <button
            className="p-2 w-28 bg-purple-500 hover:bg-purple-900 text-white font-bold rounded-lg"
            onClick={() => navigate("/")}
          >
            Go Back
          </button>
          <img src="./SMART.png" alt="logo" className="h-12 items-center" />
          <h1 className="text-xl font-bold text-black">Evaluation Dashboard</h1>
        </div>
      </header>

      {/* Main layout with left panel, content, and right panel */}
      <div className="flex flex-grow">
        {/* Left panel */}
        <aside className="w-1/8 bg-white rounded-3xl m-2 text-white p-4 shadow ">
          <LeftPanel />
        </aside>

        {/* Main content area */}
        <main className="flex-grow bg-white  rounded-3xl m-2 text-white p-4 shadow ">
          <PDFViewer pdfFile="../../../public/sample.pdf" />
        </main>

        {/* Right panel */}
        <aside className="w-1/5 bg-white backdrop-blur-lg rounded-3xl m-2 text-white p-4  shadow">
          <RightPanel />
        </aside>
      </div>
    </div>
  );
};

export default EvaluationDashboard