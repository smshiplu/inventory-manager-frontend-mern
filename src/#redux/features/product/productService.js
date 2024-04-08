import axios from "axios";

// Create new product
const createProduct = async (formData) => {
  const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/products`, formData);
  return response.data;
}

// Get all product
const getAllProducts = async () => {
  const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`);
  return response.data;
}

// Delete single product
const deleteProduct = async (id) => {
  const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`);
  return response.data;
}


export const productService = {
  createProduct,
  getAllProducts,
  deleteProduct
}