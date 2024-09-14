import { React, useState } from 'react'
import FormBackground from "../components/FormBackground";
import Input from '../components/Input';
import {  Mail, Lock } from "lucide-react"
import { Link } from 'react-router-dom';


const Login = () => {
    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");

    const handelsSignUp = (e) => {
        e.preventDefault()
    }

    return (
        <FormBackground>
            <h2
                className='text-3xl font-bold mb-6 text-center  bg-gradient-to-l from-purple-500 to-purple-900 text-transparent bg-clip-text'
            >
                Login as Evaluator
            </h2>

            <form onSubmit={handelsSignUp}>
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

                <div className='flex items-center mb-4'>
                    <Link to={"/forgot-password"} className='text-purple-500 hover:underline'>
                        Forgot Password?
                    </Link>
                </div>

                <button className='w-full p-3 bg-purple-500 hover:bg-purple-900 text-white font-bold rounded-lg'>
                    Login
                </button>
            </form>
            <div className='px-8 py-4  bg-opacity-50 flex justify-center'>
                <p className='text-mb text-black'>
                    Don't Have a Account?{" "}
                    <Link to={"/signup"} className='text-purple-500 hover:underline'>
                        SignUp
                    </Link>
                </p>
            </div>
        </FormBackground>
    );
}

export default Login;