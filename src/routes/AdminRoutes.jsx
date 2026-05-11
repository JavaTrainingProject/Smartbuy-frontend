import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import AdminDashboard from "../pages/AdminDashboard";
import CategoryRoutes from "./CategoryRoutes";
import AdminHome from "../pages/AdminHome";
import UserProfile from "../pages/UserProfile";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        
        <Route index element={<AdminDashboard />} />

        <Route path="profile" element={<UserProfile />} />

        <Route path="home" element={<AdminHome />} />

        {CategoryRoutes}
      </Route>
    </Routes>
  );
}


export default AdminRoutes;