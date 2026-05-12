import axiosInstance from "./axiosInstance";

// GET ALL PRODUCTS
export const getAllProducts = (page = 0, size = 5) => {
  return axiosInstance.get(`/products?page=${page}&size=${size}`);
};

// GET PRODUCT BY ID
export const getProductById = (id) => {
  return axiosInstance.get(`/products/${id}`);
};

// CREATE PRODUCT
export const createProduct = (formData) => {
  return axiosInstance.post(`/products/create`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// DELETE PRODUCT
export const deleteProduct = (id) => {
  return axiosInstance.delete(`/products/${id}`);
};

// TOGGLE STATUS (FIXED)
export const toggleProductStatus = (id, status) => {
  return axiosInstance.patch(`/products/${id}/status?status=${status}`);
};