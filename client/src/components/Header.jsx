import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col items-center px-4 mt-20 text-center text-gray-800">
      <img
        src={assets.header_img}
        alt=""
        className="w-36 h-36 rounded-full mb-6"
      />
      <h1 className="flex items-center g-2 text-xl sm:text-3xl font-medium mb-2">
        Hey Developer{" "}
        <img src={assets.hand_wave} alt="" className="w-8 aspect-square" />
      </h1>
      <h2>Welcome to our app</h2>
      <p>
        Lets start with a quick product tour and we will have you up and running
        in no time!
      </p>
      <button>Get Started</button>
    </div>
  );
};

export default Header;
