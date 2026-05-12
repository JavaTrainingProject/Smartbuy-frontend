import { useEffect, useState } from "react";
import "../styles/AdminDashboard.css";
import { getDashboardStats } from "../services/adminService";


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

    const data = await getDashboardStats();

   

    setStats(data);

  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
  } finally {
    setLoading(false);
  }
};
   return (
    <div className="dashboard-container admin-home-wrapper">

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