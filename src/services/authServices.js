import { fetchData } from "./api";
import Cookies from "js-cookie"
export const userSignUp = async (data) => {

  try {
    const response = await fetchData("signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.error("Error fatch....", error);
  }
};
export const userLogin = async (data) => {

  try {
    const response = await fetchData("login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.error("Error fatch....", error);
  }
};


export const getAllFilteredCourse = async () => {
  try {
    const response = await fetchData("get_all_courses_filter", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
    return response;
  } catch (eror) {
    console.log("filtered courses eror", eror);
  }
};

export const createAdmin = async (data) => {
  console.log("admin data",data)
  try {
    const token=Cookies.get("token");
    const response = await fetchData("createAdmin", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization:`Bearer ${token}`
      },

      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.error("Error fatch....", error);
  }
};

export const sendOTP = async (email) => {
  try {
    const response = await fetchData("sendotp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    });
    return response;
  } catch (eror) {
    console.log("Error fatch", eror);
  }
};

export const matchOTP = async (obj) => {
  try {
    const response = await fetchData("otpverification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    return response;
  } catch (eror) {
    console.log("Error fetch", eror);
  }
};

export const updatePassword = async (obj) => {
  try {
    const response = await fetchData("resetpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    return response;
  } catch (eror) {
    console.log(eror);
  }
};
