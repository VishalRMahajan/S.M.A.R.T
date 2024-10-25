import React from 'react';
import LeftPanel from '../../components/Evaluator/LeftPanel';
import RightPanel from '../../components/Evaluator/RightPanel';
import { useNavigate, useLocation } from 'react-router-dom';
import PDFViewer from '../../components/Evaluator/PDFViewer';
import logo from '../../assets/SmartLogoDark.png';

const EvaluationDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fileUrl } = location.state || {};

  return (
    <div className="min-h-screen flex flex-col h-screen bg-gray-200 overflow-x-auto">
      {/* Header */}
      <header className="bg-white rounded-3xl m-2 text-white p-4 shadow h-16">
        <div className="flex flex-row justify-between items-center h-full">
          <button
            className="p-2 w-28 bg-blue-700 hover:bg-blue-900 text-white font-bold rounded-lg"
            onClick={() => navigate("/")}
          >
            Go Back
          </button>
          <img src={logo} alt="logo" className="h-12 items-center" />
          <h1 className="text-xl font-bold text-black">Evaluation Dashboard</h1>
        </div>
      </header>

      {/* Main layout with left panel, content, and right panel */}
      <div className="flex flex-grow">
        {/* Left panel */}
        <aside className="w-44 bg-white rounded-3xl m-2 text-white p-4 shadow">
          <LeftPanel />
        </aside>

        {/* Main content area */}
        <main className="flex-grow bg-white rounded-3xl m-2 text-white p-4 shadow">
          {fileUrl ? (
            <PDFViewer pdfFile={fileUrl} />
          ) : (
            <p className="text-black">No paper selected.</p>
          )}
        </main>

        {/* Right panel */}
        <aside className="w-1/4 bg-white backdrop-blur-lg rounded-3xl m-2 text-white p-4 shadow">
          <RightPanel />
        </aside>
      </div>
    </div>
  );
};

export default EvaluationDashboard;