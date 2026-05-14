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

export const createProduct = async (formData) => {

  const res = await axiosInstance.post(
    "/products",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};




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