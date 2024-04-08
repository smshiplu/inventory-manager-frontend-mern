import axios from "axios";
import { toast } from "react-toastify";

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
}

// Register user
export const register = async (userData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/register`, userData, {withCredentials:true});

    if(response.statusText === "OK") {
      toast.success("User registered successfully");
    }
    return response.data;

  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
  }
}

// Login user
export const login = async (userData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/login`, userData);

    if(response.statusText !== "OK") {
      toast.error("User cannot be logged in, try again");
    }
    return response.data;

  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
  }
}

// Get login status
export const loginStatus = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/loginStatus`);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
  }
}

// Logout 
export const logout = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/logout`);
    if(response.statusText !== "OK") {
      toast.error("Cannot logout, try again");
    }

  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
  }
}

// Forgot password
export const forgotPassword = async (userData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/forgetPassword`, userData);
    toast.success(response.data.message);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
  }
}

// Reset password
export const resetPassword = async (userData, token) => {
  try {
    const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/users/resetPassword/${token}`, userData);
    toast.success(response.data.message);

  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
  }
}

// Get user Profile 
export const getUser = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/getUser`);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
  }
}

// Update user profile 
export const updateUser = async (userData) => {
  try {
    const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/users/updateUser`, userData);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
  }
}

// Update user password 
export const updatePassword = async (userData) => {
  try {
    const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/users/updatePassword`, userData);
    if(response.statusText !=="OK") {
      return false;
    }
    return response.data;

  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
  }
}
