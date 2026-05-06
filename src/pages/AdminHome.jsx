import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminDashboard.css";

function AdminHome() {

  const [stats, setStats] = useState({
    activeCategoriesCount: 0,
    activeSubCategoriesCount: 0,
    activeProductsCount: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {

      const token = localStorage.getItem("token");
       console.log("TOKEN:", token);

      const response = await axios.get(
        "http://localhost:8080/api/admin/dashboard/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(response.data);

    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

   return (
    <div className="dashboard-container">

      <h1 className="dashboard-title">
        Admin Dashboard
      </h1>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h2>Active Categories</h2>

          <p>{stats.activeCategoriesCount}</p>
        </div>

        <div className="dashboard-card">
          <h2>Active SubCategories</h2>

          <p>{stats.activeSubCategoriesCount}</p>
        </div>

        <div className="dashboard-card">
          <h2>Active Products</h2>

          <p>{stats.activeProductsCount}</p>
        </div>

      </div>
    </div>
  );
}

export default AdminHome;