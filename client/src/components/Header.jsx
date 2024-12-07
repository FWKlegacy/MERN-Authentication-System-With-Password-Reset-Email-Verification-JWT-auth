import { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContext";

const Header = () => {
  const { userData } = useContext(AppContent);
  return (
    <div className="flex flex-col items-center px-4 mt-20 text-center text-gray-800">
      <img
        src={assets.header_img}
        alt=""
        className="w-36 h-36 rounded-full mb-6"
      />
      <h1 className="flex items-center g-2 text-xl sm:text-3xl font-medium mb-2">
        Hey {userData ? userData.name : "Developer"}!{" "}
        <img src={assets.hand_wave} alt="" className="w-8 aspect-square" />
      </h1>
      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
        Welcome to our app
      </h2>
      <p className="mb-8 max-w-md">
        Lets start with a quick product tour and we will have you up and running
        in no time!
      </p>
      <button className="border border-gray-500 rounded-full hover:bg-gray-100 py-2.5 px-8 transition-all">
        Get Started
      </button>
    </div>
  );
};

export default Header;
