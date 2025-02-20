import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useEffect, useRef } from "react";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const EmailVerify = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const { backendUrl, isLoggedIn, userData, getUserData } =
    useContext(AppContent);
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0)
      inputRefs.current[index - 1].focus();
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");
      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-account",
        { otp }
      );
      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/home");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    isLoggedIn && userData && userData.IsAccountVerified && navigate("/home");
  }, [isLoggedIn, userData, navigate]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-200">
      <img
        onClick={() => navigate("/home")}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <form
        onSubmit={handleSubmit}
        className="rounded-lg w-96 text-sm shadow-lg bg-slate-900 items-center"
      >
        <h1 className="text-white mb-4 text-center font-semibold text-2xl mt-3">
          Email Verify OTP
        </h1>
        <p className="mb-6 text-indigo-300 text-center">
          Enter the 6-digit code sent to your email Id
        </p>
        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                maxLength="1"
                key={index}
                required
                className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
                ref={(e) => (inputRefs.current[index] = e)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>
        <button className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mb-4">
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
