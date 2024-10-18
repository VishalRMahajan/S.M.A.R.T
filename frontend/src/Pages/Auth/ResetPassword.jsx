import React, { useState } from 'react'
import FormBackground from '../../components/FormBackground'
import { Lock } from 'lucide-react';
import Input from '../../components/Input';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

const ResetPassword = () => {

  const [password, SetPassword] = useState("");
  const [confirmpassword, SetConfirmPassword] = useState("");

  const { resetpassword, error } = useAuthStore();

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(password !== confirmpassword)
    {
      toast.error("Passwords do not match");
      return
    }
    try {
      await resetpassword(token,password);
      navigate("/login");
      toast.success("Password Reset Successfully.Please Login!!");
    } catch (error) {
      toast.error(error.message || "error occurred")
      console.log(error)
    }
  }
  return (
    <div className="flex min-h-screen">
      <div className="flex justify-center items-center w-1/2 bg-gradient-to-l from-blue-700 to-blue-900 p-10">
        <div className="flex flex-col justify-center items-center bg-white bg-opacity-25 backdrop-blur-lg rounded-3xl p-6 shadow-lg">
          <img src="../../public/SFITLogo.png" alt="Logo" className="h-56 mt-14" />
          <img src="../../public/SmartLogo.png" alt="Logo" className="mb-14 mr-14 ml-14" />
        </div>
      </div>

      <div className="flex justify-center items-center w-1/2 bg-white p-10">
        <div className="w-full max-w-md mt-6 bg-blue-700 bg-opacity-25 backdrop-blur-lg rounded-3xl p-6 shadow-lg">
          <h2
            className='text-3xl font-bold mb-6 text-center  bg-gradient-to-l from-blue-700 to-blue-900 text-transparent bg-clip-text'
          >
            Reset Password
          </h2>


          <form onSubmit={handleSubmit}>

            <Input
              icon={Lock}
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => SetPassword(e.target.value)}
            />

            <Input
              icon={Lock}
              type='password'
              placeholder='Confirm Password'
              value={confirmpassword}
              onChange={(e) => SetConfirmPassword(e.target.value)}
            />
            {error && <div class="mb-5  flex text-center justify-center  text-sm rounded-lg text-red-400" >
              <span class="font-medium">{error} </span>
            </div>}
            <button className='w-full p-3 bg-blue-700 hover:bg-blue-900 text-white font-bold rounded-lg'>
              Reset Password
            </button>
          </form>


        </div>
      </div>


    </div>
  )
}

export default ResetPassword