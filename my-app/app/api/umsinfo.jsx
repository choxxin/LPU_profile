import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_UMS_API_BASE_URL ||
  " http://localhost:8000/api/v1/user";

export const loginUser = async (reg_no, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      reg_no,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

export const getUserDetails = async (reg_no, password, cookie) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/me`, {
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
export const handleleetcodeprofile = async (leetusername) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/${leetusername}/solved`
    );
    return response.data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};
