
import axiosInstance from "./axiosInstance";

// GET SUBCATEGORIES
export const getSubCategoriesByCategory = async (categoryId) => {
  const res = await axiosInstance.get(
    `/api/subcategory/categories/${categoryId}/subcategories`
  );

  return res.data?.data || [];  
};
