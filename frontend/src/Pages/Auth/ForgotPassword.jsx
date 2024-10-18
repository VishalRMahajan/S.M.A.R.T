import React, { useState } from 'react'
import FormBackground from '../../components/FormBackground'
import { useAuthStore } from '../../store/authStore';
import Input from '../../components/Input';
import { ArrowLeft, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ForgotPassword = () => {

  const [email, SetEmail] = useState("");
  const navigate = useNavigate();

  const { forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await forgotPassword(email);
      navigate("/login");
      toast.success("If an account exists for " + email + ", you will receive a password reset link shortly",{
        duration: 6000,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <FormBackground>
      <h2
        className='text-3xl font-bold mb-2 text-center  bg-gradient-to-l from-blue-700 to-blue-900 text-transparent bg-clip-text'
      >
        Forgot Password
      </h2>


      <form onSubmit={handleSubmit}>
        <p className='text-black mb-6 text-center'>
          Enter your email Address and we'll send you a link to reset your password.
        </p>
        <Input
          icon={Mail}
          type='email'
          placeholder='Email Address'
          value={email}
          onChange={(e) => SetEmail(e.target.value)}
        />

        <button className='w-full p-3 bg-blue-700 hover:bg-blue-900 text-white font-bold rounded-lg'>
          Send Reset Link
        </button>
      </form>


      <div className='px-8 py-4  bg-opacity-50 flex justify-center'>
        <p className='text-mb text-black'>
          <Link to={"/login"} className='text-blue-700 hover:underline flex justify-center items-center'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Login
          </Link>
        </p>
      </div>




    </FormBackground>
  )
}

export default ForgotPassword