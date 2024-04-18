import axios from "axios";
import { toast } from "react-toastify";

// Create Product
export const createProduct = async (formData) => {
  try {
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/products`, formData);
    toast.success("Product created successfully");
    // return response.data;

  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
  }
}

// Get all Products
export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`);
    return response.data;

  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
  }
}

// Delete Product
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`);
    toast.success("Product deleted successfully");
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
  }
}

// Get product
export const getProduct = async (id) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
  }
}

// Update product
export const updateProduct = async (id, formData) => {
  try {
    await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`, formData);
    toast.success("Product updated successfully")
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
  }
}