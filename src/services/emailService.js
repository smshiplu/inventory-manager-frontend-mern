import axios from "axios";
import { toast } from "react-toastify";

export const contactUs = async (formData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/contactUs`, formData);
    toast.success(response.data.message);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
  }
} 