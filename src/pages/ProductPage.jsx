

import { useEffect, useState } from "react";
import "../styles/ProductPage.css";

function ProductPage() {

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");

  const token = localStorage.getItem("accessToken");

  // ================= IMAGE HELPER =================
  const getImageUrl = (url) => {
    if (!url) return "https://via.placeholder.com/200";

    if (url.startsWith("http")) return url;

    return `http://localhost:8080${url}`;
  };

  // ================= LOAD DATA =================
  useEffect(() => {
    fetchCategories();
    fetchAllProducts();
  }, []);

  // ================= FETCH ALL PRODUCTS =================
  const fetchAllProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/products?page=0&size=100",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      const allProducts =
        result?.data?.content ||
        result?.content ||
        result?.data ||
        [];

      setProducts(allProducts);

    } catch (error) {
      console.log("PRODUCTS ERROR:", error);
    }
  };

  // ================= FETCH CATEGORIES =================
  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/categories/active?page=0&size=100",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      setCategories(result?.data?.content || []);

    } catch (error) {
      console.log("CATEGORY ERROR:", error);
    }
  };

  // ================= FETCH SUBCATEGORIES =================
  const fetchSubCategories = async (categoryId) => {

    if (!categoryId) {
      setSubCategories([]);
      fetchAllProducts();
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/subcategory/categories/${categoryId}/subcategories?page=0&size=100`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      setSubCategories(result?.data || []);

    } catch (error) {
      console.log("SUBCATEGORY ERROR:", error);
    }
  };

  // ================= FETCH PRODUCTS BY SUBCATEGORY =================
  const fetchProductsBySubCategory = async (subCategoryId) => {
  try {
    const response = await fetch(
  `http://localhost:8080/api/products/subcategory/${subCategoryId}?page=0&size=100`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

   const data =
  result?.data?.content ||
  result?.data?.products ||
  result?.data ||
  [];

const subProducts = Array.isArray(data) ? data : [data];

setProducts(subProducts);

  } catch (error) {
    console.log(error);
  }
};
  // ================= SEARCH FILTER =================
  const filteredProducts = products.filter((product) =>
    product?.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="product-layout">

      {/* ================= LEFT SIDEBAR ================= */}
      <div className="category-sidebar">

        <h2>Categories</h2>

        <select
          className="category-dropdown"
          onChange={(e) => fetchSubCategories(e.target.value)}
        >
          <option value="">All Products</option>

          {categories.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.categoryName}
            </option>
          ))}
        </select>

        <div className="subcategory-list">

          {subCategories.length > 0 ? (
            subCategories.map((sub) => (
              <div
                key={sub.subCategoryId}
                className="subcategory-item"
                onClick={() => fetchProductsBySubCategory(sub.subCategoryId)}
              >
                {sub.subCategoryName}
              </div>
            ))
          ) : (
            <p>Select Category</p>
          )}

        </div>

      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="product-page-main-container">

        {/* SEARCH */}
        <div className="top-controls">
          <input
            type="text"
            placeholder="Search products..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {/* PRODUCTS GRID */}
        <div className="products-grid">

          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="product-card">

                <img
  src={
    product.imageUrls?.startsWith("http")
      ? product.imageUrls
      : `http://localhost:8080${product.imageUrls}`
  }
  alt={product.name}
  className="product-image"
/>

                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <h4>₹ {product.price}</h4>

              </div>
            ))
          ) : (
            <p>No Products Found</p>
          )}

        </div>

      </div>
    </div>
  );
}

export default ProductPage;