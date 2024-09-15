import { React, useState } from 'react'
import FormBackground from "../components/FormBackground";
import Input from '../components/Input';
import { User, Mail, Lock } from "lucide-react"
import { Link, useNavigate } from 'react-router-dom';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const SignUP = () => {

  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const navigate = useNavigate();

  const { signup, error } = useAuthStore();

  const handelSignUp = async (e) => {
    e.preventDefault();

    try {
      await signup(email, password, name);
      navigate("/verifyemail");
      toast.success("🎉 Account created Successfully. Please verify your email address.");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <FormBackground>
      <h2
        className='text-3xl font-bold mb-6 text-center  bg-gradient-to-l from-purple-500 to-purple-900 text-transparent bg-clip-text'
      >
        Register as Evaluator
      </h2>

      <form onSubmit={handelSignUp}>
        <Input
          icon={User}
          type='text'
          placeholder='Full Name'
          value={name}
          onChange={(e) => SetName(e.target.value)}
        />
        <Input
          icon={Mail}
          type='email'
          placeholder='Email Address'
          value={email}
          onChange={(e) => SetEmail(e.target.value)}
        />
        <Input
          icon={Lock}
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => SetPassword(e.target.value)}
        />
        {error && <div class="mb-5  flex text-center justify-center  text-sm rounded-lg text-red-400" >
          <span class="font-medium">{error} </span>
        </div>}

        <PasswordStrengthMeter password={password} />

        <button className='w-full p-3 mt-5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg'>
          Register
        </button>
      </form>
      <div className='px-8 py-4  bg-opacity-50 flex justify-center'>
        <p className='text-mb text-black'>
          Already have an account?{" "}
          <Link to={"/login"} className='text-purple-500 hover:underline'>
            Login
          </Link>
        </p>
      </div>
    </FormBackground>
  )
}

export default SignUP