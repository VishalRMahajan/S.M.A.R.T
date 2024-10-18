const MarkButton = ({ label }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", label);
    console.log("Dragging mark:", label); // This will log the mark being dragged
  };

  return (
    <button
      className="bg-gray-100 text-black rounded-full w-10 h-10 flex items-center justify-center border"
      draggable="true"
      onDragStart={handleDragStart}
    >
      {label}
    </button>
  );
};

export  default MarkButton;
