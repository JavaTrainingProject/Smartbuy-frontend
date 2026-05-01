import { Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import AdminDashboard from "../pages/AdminDashboard";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<Layout />}>
        <Route index element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;