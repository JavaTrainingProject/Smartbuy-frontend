import axiosInstance from "./axiosInstance";


export const getActiveCategories = async () => {
  return await axiosInstance.get(
    "/admin/categories/active?page=0&size=100"
  );
};


export const getAllSubCategories = async (
  page = 0,
  size = 5
) => {
  return await axiosInstance.get(
    `/subcategory?page=${page}&size=${size}`
  );
};


export const createSubCategory = async (
  data
) => {
  return await axiosInstance.post(
    "/subcategory",
    data
  );
};


export const updateSubCategory = async (
  id,
  data
) => {
  return await axiosInstance.put(
    `/subcategory/${id}`,
    data
  );
};


export const deleteSubCategory = async (
  id
) => {
  return await axiosInstance.delete(
    `/subcategory/${id}`
  );
};


export const getSubCategoriesByCategory = (
  categoryId
) => {
  return axiosInstance.get(
    `/subcategory/categories/${categoryId}/subcategories`
  );
};


export const toggleSubCategoryStatus = async (
  id,
  status
) => {
  return await axiosInstance.patch(
    `/subcategory/${id}/status?status=${status}`
  );
};