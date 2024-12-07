import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const EmailVerify = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-200">
      <img
        onClick={() => navigate("/home")}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <form className="rounded-lg w-96 text-sm shadow-lg bg-slate-900 items-center">
        <h1 className="text-white mb-4 text-center font-semibold text-2xl mt-3">
          Email Verify OTP
        </h1>
        <p className="mb-6 text-indigo-300 text-center">
          Enter the 6-digit code sent to your email Id
        </p>
        <div className="flex justify-between mb-8">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                maxLength="1"
                key={index}
                required
                className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
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
