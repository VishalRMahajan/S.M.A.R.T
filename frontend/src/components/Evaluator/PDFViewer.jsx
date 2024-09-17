import React, { useEffect, useRef, useState } from "react";
import * as pdfjs from "pdfjs-dist";
import { Minus, Plus } from "lucide-react";
import { useEvaluatorStore } from "../../store/evaluatorStore";

// Use the correct worker
pdfjs.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

const PDFViewer = ({ pdfFile }) => {
  const canvasRef = useRef(null);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const { selectedQuestion, updateMarks } = useEvaluatorStore();


  useEffect(() => {
    const loadPDF = async () => {
      const loadingTask = pdfjs.getDocument(pdfFile);
      const pdf = await loadingTask.promise;
      setNumPages(pdf.numPages);
      renderPage(pdf, pageNumber);
    };

    const renderPage = async (pdf, pageNum) => {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1 });
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      page.render(renderContext);
    };

    loadPDF();
  }, [pdfFile, pageNumber]);

  useEffect(() => {
    const canvas = canvasRef.current;

    const handleDrop = (e) => {
      
      e.preventDefault();
      const droppedMark = e.dataTransfer.getData("text/plain");
      const x = e.clientX - canvas.getBoundingClientRect().left;
      const y = e.clientY - canvas.getBoundingClientRect().top;
      console.log(`Dropped mark: ${droppedMark} at position: (${x}, ${y})`);
      // You can use these coordinates to mark the PDF or perform further actions
      if (selectedQuestion) {
        console.log(
          `Marks for ${selectedQuestion}: ${droppedMark} dropped at (${x}, ${y})`
        );

        // Logic to draw the selected question (e.g., "Q1a") and marks onto the canvas or PDF
        updateMarks(selectedQuestion, droppedMark);
        drawOnPDF(selectedQuestion, droppedMark, x, y);
      }
    };

    const handleDragOver = (e) => {
      e.preventDefault(); // Allow the drop
    };

    const drawOnPDF = (question, mark, x, y) => {
      const ctx = canvas.getContext("2d");
      ctx.font = "20px Arial Bold background-black";
      ctx.fillStyle = "Red";
      ctx.fillText(`${question} ) ${mark}`, x, y);
    };

    canvas.addEventListener("dragover", handleDragOver);
    canvas.addEventListener("drop", handleDrop);

    return () => {
      canvas.removeEventListener("dragover", handleDragOver);
      canvas.removeEventListener("drop", handleDrop);
    };
  }, [selectedQuestion, updateMarks]);

  const goToNextPage = () => {
    if (pageNumber < numPages) setPageNumber(pageNumber + 1);
  };

  const goToPrevPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  return (
    <div className="flex pdf-viewer flex-col items-center justify-center">
      <div className="controls flex justify-center items-center mt-4 space-x-4">
        <button
          onClick={goToPrevPage}
          disabled={pageNumber <= 1}
          className="p-2 bg-purple-500 text-white rounded-md"
        >
          <Minus className="" />
        </button>
        <span className="text-black">
          {pageNumber} / {numPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={pageNumber >= numPages}
          className="p-2 bg-purple-500 text-white rounded-md"
        >
          <Plus className="" />
        </button>
        
      </div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default PDFViewer;
