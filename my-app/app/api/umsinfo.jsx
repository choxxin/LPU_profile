import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_UMS_API_BASE_URL ||
  " http://localhost:8000/api/v1/user/me";

export const loginUser = async (reg_no, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, {
      reg_no,
      password,
      cookie: "ASP.NET_SessionId=2vzn210ipbavg13axblzl2hx",
    });
    return response.data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

export const getUserDetails = async (reg_no, password, cookie) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/me`, {
      reg_no,
      password,
      cookie,
    });
    return response.data;
  } catch (error) {
    console.error("Get User Details Error:", error);
    throw error;
  }
};
