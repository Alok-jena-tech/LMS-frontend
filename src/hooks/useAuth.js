// src/hooks/useAuth.js
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import {
  matchOTP,
  updatePassword,
  sendOTP,
  userLogin,
  createAdmin,
  userSignUp,
} from "../services/authServices";
import Cookies from "js-cookie";
import { useState } from "react";
import {
  CLEAR_MAIN_LOADER,
  MAIN_LOADER,
  INNER_LOADER,
  // CLEAR_INNER_LOADER,
} from "../utils/constants";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, setUser, setIsAuthenticated } =
    useAuthContext();

  const [darkMode, setDarkMode] = useState(false);
  const [isForget, setIsForget] = useState(false);
  const [showOtp, setshowOtp] = useState(false);

  const [timer, setTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const [forgetEmail, setForgetEmail] = useState("");
  const [mailOTP, setMailOTP] = useState("");
  // const [userId, setUserId] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [newpassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loginData, SetLoginData] = useState({
    Email: "",
    Password: "",
  });

  const [errors, setErrors] = useState({});

  const [newAdmin, setnewAdmin] = useState({
    Role: "Admin",
    Full_name: "",
    Phone_number: "",
   
    Email: "",
    
  });
  const handlNewAdmineChange = (e) => {
    const { name, value } = e.target;
    // handle nested Address fields
    
      setnewAdmin((prev) => ({
        ...prev,
        [name]: value,
      }));
  };
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const handleModalForget = () => {
    setIsForget(!isForget);
    setshowOtp(false);
  };

  const signUp = async (data) => {
    dispatch({ type: INNER_LOADER, payload: true });

    try {
      const response = await userSignUp(data);
      if(response.status===200){
        alert(response.message)
      }
    } catch (err) {
      console.error("signup eror", err);
    } finally {
      dispatch({ type: CLEAR_MAIN_LOADER, payload: false });
    }
  };
  const login = async () => {
    dispatch({ type: MAIN_LOADER, payload: true });
    try {
      const response = await userLogin(loginData); // assumes { user, token }

      if (response?.status === 200) {
        const { data, token } = response;

        // Store token in cookie
        Cookies.set("token", token, { expires: 1, secure: true }); // 1 day expiry
        Cookies.set("user", JSON.stringify(data), { expires: 1, secure: true });

        setUser(data);
        setIsAuthenticated(true);

        if (data?.Role === "Admin") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      } else {
        alert(response?.message);
              navigate("/");

      }
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    } finally {
      dispatch({ type: CLEAR_MAIN_LOADER, payload: false });
    }
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");

    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  const sendOTPByEmail = async () => {
    try {
      if (!forgetEmail) return alert("Please enter your email");
      const response = await sendOTP({ recipientEmail: forgetEmail });
      if (response?.status === 200) {
        setshowOtp(true);
        setIsTimerActive(true);
        setTimer(60);
        alert(response?.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  const handleOTPSubmit = async () => {
    try {
      if (!mailOTP) return alert("Please enter OTP");
      let obj = {
        recipientEmail: forgetEmail,
        OTP: mailOTP,
      };
      const response = await matchOTP(obj);
      if (response?.status === 201) {
        setIsOtpVerified(true);
        alert(response?.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  }; //target!!!!!

  const handleResetPass = async () => {
    try {
      if (!newpassword || !confirmPassword)
        return alert("please enter proper password");
      if (newpassword !== confirmPassword) {
        alert("your password is mismatch");
      }
      let obj = {
        recipientEmail: forgetEmail,
        newPassword: newpassword,
      };
      const response = await updatePassword(obj);
      if (response?.status === 201) {
        setshowOtp(false);
        handleModalForget();
        alert(response?.message);
      }
    } catch (eror) {
      console.log(eror);
    }
  }; //target!!!!!

  const makeNewAdmin = async () => {
    try {
      const response = await createAdmin(newAdmin);
      if (response?.status === 200) {
        alert("create Admin successfully");
      }
    } catch (eror) {
      console.log("Admin error", eror);
    }
  }; //target!!!!!

  return {
    user,
    isAuthenticated,
    signUp,
    login,
    logout,

    sendOTPByEmail,
    handleOTPSubmit,
    handleResetPass,

    darkMode,
    isForget,
    showOtp,

    timer,
    setTimer,
    isTimerActive,
    setIsTimerActive,

    forgetEmail,
    setForgetEmail,
    mailOTP,
    setMailOTP,
    // userId,
    // setUserId,
    isOtpVerified,
    // setIsOtpVerified,
    newpassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    loginData,
    SetLoginData,

    toggleDarkMode,
    handleModalForget,
    errors,
    setErrors,
    makeNewAdmin,
    newAdmin,
    setnewAdmin,
    handlNewAdmineChange,
  };
};
