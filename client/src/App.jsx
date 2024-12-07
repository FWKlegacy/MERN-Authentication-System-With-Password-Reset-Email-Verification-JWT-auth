import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import ResetPassword from "./pages/ResetPassword";
import EmailVerify from "./pages/EmailVerify";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/emailverify" element={<EmailVerify />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
      </Routes>
    </div>
  );
};

export default App;
