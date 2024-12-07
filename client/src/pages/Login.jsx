import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContent } from "../context/AppContext";

const Login = () => {
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContent);

  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/home");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });

        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/home");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-200">
      <img
        onClick={() => navigate("/home")}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full text-indigo-300 sm:w-96 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign Up" ? "Create  Account" : "Login"}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === "Sign Up"
            ? "Create your Account"
            : "Login to your Account"}
        </p>
        <form onSubmit={handleSubmit}>
          {state === "Sign Up" && (
            <div className="mb-5 gap-3 w-full flex items-center px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="" />
              <input
                type="text"
                placeholder="Full Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                className="outline-none bg-transparent"
              />
            </div>
          )}

          <div className="mb-5 gap-3 w-full flex items-center px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="" />
            <input
              type="email"
              placeholder="Email Id"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className="outline-none bg-transparent"
            />
          </div>
          <div className="mb-5 gap-3 w-full flex items-center px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="" />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="outline-none bg-transparent"
            />
          </div>
          <p
            className="mb-4 cursor-pointer text-indigo-500"
            onClick={() => navigate("/resetpassword")}
          >
            Forgot Password ?
          </p>
          <button className="rounded-full w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">
            {state}
          </button>
        </form>
        {state === "Sign Up" ? (
          <p className="text-gray-400 text-sm mt-4 text-center">
            Already have an Account ?{" "}
            <span
              className="text-blue-400 underline cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login Here
            </span>
          </p>
        ) : (
          <p className="text-gray-400 text-sm mt-4 text-center">
            Dont have an Account ?{" "}
            <span
              className="text-blue-400 underline cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
