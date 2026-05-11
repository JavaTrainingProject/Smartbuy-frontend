import axiosInstance from "./axiosInstance";


export const getActiveCategories = async () => {
  return await axiosInstance.get("/admin/categories/active");
};

export const getAllSubCategories = async (page = 0) => {
  return await axiosInstance.get(
    `/subcategory/active?page=${page}&size=5`
  );
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

export const toggleSubCategoryStatus = async (id, status) => {
  return await axiosInstance.patch(`/subcategory/${id}/status`, {
    status,
  });
};