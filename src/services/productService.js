import axiosInstance from "./axiosInstance";

// GET ALL PRODUCTS
export const getAllProducts = async () => {

  const res = await axiosInstance.get(
    "/products?page=0&size=50"
  );

  console.log("PRODUCT RESPONSE:", res.data);

  return res.data?.data?.content || [];
};


// GET PRODUCT BY ID
export const getProductById = async (id) => {

  const res = await axiosInstance.get(
    `/products/${id}`
  );

  return res.data?.data;
};


// CREATE PRODUCT

// GET PRODUCTS BY CATEGORY
export const getProductsByCategory = async (
  categoryName
) => {

  const res = await axiosInstance.get(
    "/products?page=0&size=50"
  );

  const products =
    res.data?.data?.content || [];

  return products.filter(
    (product) =>

      product.categoryName
        ?.toLowerCase() ===
      categoryName?.toLowerCase()
  );
};