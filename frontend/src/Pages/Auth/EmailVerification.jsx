import { React, useRef, useState, useEffect } from 'react'
import FormBackground from '../../components/FormBackground'
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'react-hot-toast';

const EmailVerification = () => {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    const { verifyemail, error } = useAuthStore();

    const handleChange = (index, value) => {

        if (!/^\d*$/.test(value)) {
            return;
        }

        const newCode = [...code];

        if (newCode.join("").length >= 6 && value) {
            return;
        }

        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);


            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex].focus();

        } else {
            newCode[index] = value;
            setCode(newCode);


            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join("");
        try {
            await verifyemail(verificationCode);
            navigate("/");
            toast.success("Email verified successfully");
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        if (code.every((digit) => digit !== "")) {
            handleSubmit(new Event("submit"));
        }
    }, [code]);


    return (
        <FormBackground>
            <h2
                className='text-3xl font-bold mb-6 text-center  bg-gradient-to-l from-blue-700 to-blue-900 text-transparent bg-clip-text'
            >
                Verify Your Account
            </h2>
            <p className="text-center bg-gradient-to-l from-blue-700 to-blue-900 text-transparent bg-clip-text mb-6">Enter the 6-digit OTP sent to your email address.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-between">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            maxLength="6"
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className='w-12 h-12 text-center text-2xl font-bold bg-transparent text-black border-2 border-gray-700 rounded-lg
                                    focus:border-blue-700 focus:outline-none'
                        />
                    ))}
                </div>

                {error && <div class="mb-5  flex text-center justify-center  text-sm rounded-lg text-red-400" >
                    <span class="font-medium">{error} </span>
                </div>}

                <button className='w-full p-3 bg-blue-700 hover:bg-blue-900 text-white font-bold rounded-lg'>
                    Submit
                </button>
            </form>
        </FormBackground>
    )
}

export default EmailVerification