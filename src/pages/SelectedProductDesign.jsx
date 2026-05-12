
import "../styles/ProductPage.css";

function SelectedProductDesign({ selectedProductDetails = [] }) {
  return (
    <div className="products-grid">
      {selectedProductDetails.map((product) => (
        <div key={product.id} className="selected-product-card">

          {/* ✅ YOUR BACKEND FIELD */}
          <img
            src={product.imageUrls}
            alt={product.name}
            className="selected-product-image"
          />

          {/* ✅ YOUR BACKEND FIELDS */}
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <h4>₹{product.price}</h4>

        </div>
      ))}
    </div>
  );
}

export default SelectedProductDesign;