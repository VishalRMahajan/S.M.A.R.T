import React, { useState } from "react";
import FormBackground from "../../components/FormBackground";
import Input from "../../components/Input";
import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login, error, checkApprove } = useAuthStore();

  const checkapprove = async (e) => {
    e.preventDefault();
    try {
      const isApproved = await checkApprove(email);
      if (isApproved) {
        handleLogin(e);
      } else {
        toast.error("Please wait for Admin approval");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
      toast.success("Login Successful");
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <FormBackground>
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-l from-blue-700 to-blue-900 text-transparent bg-clip-text">
        Login
      </h2>

      <form onSubmit={checkapprove}>
        <Input
          icon={Mail}
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          icon={Lock}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex items-center mb-4">
          <Link
            to={"/forgot-password"}
            className="bg-gradient-to-l from-blue-700 to-blue-900 text-transparent bg-clip-text hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        {error && (
          <div className="mb-5 flex text-center justify-center text-sm rounded-lg text-red-400">
            <span className="font-medium">{error}</span>
          </div>
        )}
        <button className="w-full p-3 bg-blue-700 hover:bg-blue-900 text-white font-bold rounded-lg">
          Login
        </button>
      </form>
      <div className="px-8 py-4 bg-opacity-50 flex justify-center">
        <p className="text-mb text-black">
          Don't Have an Account?{" "}
          <Link to={"/signup"} className="text-blue-700 hover:underline">
            SignUp
          </Link>
        </p>
      </div>
    </FormBackground>
  );
};

export default Login;