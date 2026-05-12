import axiosInstance from "./axiosInstance";

// GET ACTIVE CATEGORIES
export const getActiveCategories = async () => {
  return await axiosInstance.get(
    "/admin/categories/active?page=0&size=100"
  );
};

// GET ALL SUBCATEGORIES
export const getAllSubCategories = async (
  page = 0,
  size = 5
) => {
  return await axiosInstance.get(
    `/subcategory?page=${page}&size=${size}`
  );
};

// CREATE SUBCATEGORY
export const createSubCategory = async (
  data
) => {
  return await axiosInstance.post(
    "/subcategory",
    data
  );
};

// UPDATE SUBCATEGORY
export const updateSubCategory = async (
  id,
  data
) => {
  return await axiosInstance.put(
    `/subcategory/${id}`,
    data
  );
};

// DELETE SUBCATEGORY
export const deleteSubCategory = async (
  id
) => {
  return await axiosInstance.delete(
    `/subcategory/${id}`
  );
};

// GET SUBCATEGORY BY CATEGORY
export const getSubCategoriesByCategory = (
  categoryId
) => {
  return axiosInstance.get(
    `/subcategory/categories/${categoryId}/subcategories`
  );
};

// TOGGLE STATUS
export const toggleSubCategoryStatus = async (
  id,
  status
) => {
  return await axiosInstance.patch(
    `/subcategory/${id}/status?status=${status}`
  );
};