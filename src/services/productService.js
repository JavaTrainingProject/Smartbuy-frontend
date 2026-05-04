import axios from "axios";

const API_URL = "http://localhost:8080/products";

export const createProduct = async (product) => {
  return await axios.post(API_URL, product);
};

// ✅ Get all products
export const getProducts = async () => {
  return await axios.get(API_URL);
};

// ✅ Get single product by ID
export const getProductById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};