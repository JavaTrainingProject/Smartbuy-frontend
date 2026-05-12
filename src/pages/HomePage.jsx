// import { useNavigate } from "react-router-dom";
// function HomePage() {
//   const navigate = useNavigate();
//   return (
//     <div>
//       <h1>Welcome to Store</h1>
//       <button onClick={() => navigate("/products")}>
//         Shop Now
//       </button>
//     </div>
//   );
// }
// export default HomePage;


// import { useNavigate } from "react-router-dom";

// function HomePage() {
//   const navigate = useNavigate();

//   return (
//     <div>
//       <h1>Welcome to SmartBuy</h1>

//       <button onClick={() => navigate("/user/products")}>
//         SHOP NOW
//       </button>
//     </div>
//   );
// }

// export default HomePage;



import ProductPage from "./ProductPage";
import "../styles/HomePage.css";

function HomePage() {
  return (
    <div className="home-container">
      {/* Welcome Section */}
      <div className="hero-section">
        <h1>Welcome to SmartBuy</h1>
        <p>Discover the best Mobiles and Laptops at great prices</p>
      </div>

      {/* Products directly shown */}
      <ProductPage />
    </div>
  );
}

export default HomePage;