import axiosInstance from "./axiosInstance";

export const getActiveCategories = async () => {
  return await axiosInstance.get("/categories/active");
};

export const getAllSubCategories = async () => {
  return await axiosInstance.get("/subcategory/active");
};

export const createSubCategory = async (data) => {
  return await axiosInstance.post("/subcategory", data);
};

export const updateSubCategory = async (id, data) => {
  return await axiosInstance.put(`/subcategory/${id}`, data);
};

export const deleteSubCategory = async (id) => {
  return await axiosInstance.delete(`/subcategory/${id}`);
};