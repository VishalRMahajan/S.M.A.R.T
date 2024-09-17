import React from 'react'

const IconButton = ({ icon: Icon, label, color }) => (
    <button
      className="bg-gray-100 text-black rounded-full w-10 h-10 flex items-center justify-center border-2 border-purple-200"
      aria-label={label}
    >
      <Icon className={`text-${color}-500`} />
    </button>
  );

export default IconButton