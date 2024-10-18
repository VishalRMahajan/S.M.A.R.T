import React from "react";
import Modal from "react-modal";
import { X } from "lucide-react";

Modal.setAppElement("#root");

const QuestionPaper = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Question Paper"
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          height: "80%",
        },
      }}
    >
      <div style={{ height: "100%" }}>
        <button onClick={onRequestClose} className="p-2 bg-blue-700 text-white rounded-3xl mb-2" style={{ position: "absolute", top: "10px", right: "10px" }}>
          <X />
        </button>
        <iframe
          src="./questionpaper.pdf"
          width="100%"
          height="100%"
          title="PDF Viewer"
          style={{ border: "none", marginTop: "40px" }}
        ></iframe>
      </div>
    </Modal>
  );
};

export default QuestionPaper;