
import "../styles/UserDashboard.css";
import { useNavigate } from "react-router-dom";


function UserDashboard() {
  const navigate = useNavigate();

  return (
    <section className="hero-container">
      <div className="hero-left">
        <h1>YOUR SMART SHOPPING PARTNER</h1>

        <button onClick={() => navigate("/user/products")}>
          SHOP NOW
        </button>
      </div>
    </section>
  );
}

export default UserDashboard;