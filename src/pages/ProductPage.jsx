// import React, { useEffect, useState } from "react";
// import { getProducts } from "../services/productService";
// import { Link } from "react-router-dom";

// const ProductsPage = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     loadProducts();
//   }, []);

//   const loadProducts = async () => {
//     try {
//       const res = await getProducts();

//       console.log("API RESPONSE:", res.data);

//       setProducts(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       console.error("Error:", err);
//       setProducts([]);
//     }
//   };

//   return (
//     <div>
//       <h2>Products List</h2>

//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Price</th>
//             <th>View</th>
//           </tr>
//         </thead>

//         <tbody>
//           {products.length > 0 ? (
//             products.map((p) => (
//               <tr key={p.id}>
//                 <td>{p.id}</td>
//                 <td>{p.name}</td>
//                 <td>₹ {p.price}</td>
//                 <td>
//                   <Link to={`/products/${p.id}`}>View</Link>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4">No products found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProductsPage;


import { useEffect, useState } from "react";
import axios from "axios";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get("http://localhost:8080/products");
      setProducts(response.data);
    } catch (err) {
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <h3>Loading products...</h3>;

  if (error) return <h3 style={{ color: "red" }}>{error}</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Product List</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "200px",
            }}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />

            <h4>{product.name}</h4>
            <p>₹ {product.price}</p>
            <p>{product.categoryName}</p>
          </div>
        
      </div>
    </div>
  );
}

export default ProductsPage;