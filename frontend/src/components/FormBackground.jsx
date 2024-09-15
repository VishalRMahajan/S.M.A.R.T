import React from "react";

const FormBackground = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Left Side: Gradient Glass with Logo */}
      <div className="flex justify-center items-center w-1/2 bg-gradient-to-l from-purple-500 to-purple-900 p-10">
        <div className="flex flex-col justify-center items-center bg-white bg-opacity-25 backdrop-blur-lg rounded-3xl p-6 shadow-lg">
          <img src="./SFITLogo.png" alt="Logo" className="h-56 mt-14" />
          <img src="./SmartLogo.png" alt="Logo" className="mb-14 mr-14 ml-14" />
        </div>
      </div>

      {/* Right Side: Blank White Page with Form */}
      <div className="flex justify-center items-center w-1/2 bg-white p-10">
        <div className="w-full max-w-md mt-6 bg-purple-500 bg-opacity-25 backdrop-blur-lg rounded-3xl p-6 shadow-lg">
          {children}
        </div>
      </div>


    </div>


  );
};

export default FormBackground;