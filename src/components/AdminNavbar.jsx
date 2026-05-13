import { Link } from "react-router-dom";
import logo from "/assets/logo.png";

function AdminNavbar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      <ul className="menu">
        <li><Link to="/admin/home"> Home</Link></li>
        <li><Link to="/admin/category"> Category</Link></li>
        <li><Link to="/admin/subcategory"> SubCategory</Link></li>
        <li><Link to="/admin/products">Product</Link></li>
      </ul>
    </div>
  );
}

export default AdminNavbar;