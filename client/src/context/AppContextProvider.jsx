import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContextProvider = ({ children }) => {
  axios.defaults.withCredentials = true;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth");
      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data");
      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);
  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
  };
  return <AppContent.Provider value={value}>{children}</AppContent.Provider>;
};
AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};