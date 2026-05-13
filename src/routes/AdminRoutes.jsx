import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import AdminDashboard from "../pages/AdminDashboard";
import CategoryRoutes from "./CategoryRoutes";
import AdminHome from "../pages/AdminHome";
import UserProfile from "../pages/UserProfile";
import ProtectedRoute from "./ProtectedRoute";
import ProductPage from "../pages/ProductPage";
import SubCategoryPage from "../pages/SubCategoryPage";

function AdminRoutes() {
  return (
    <Routes>

      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >

        <Route index element={<AdminDashboard />} />

        <Route path="profile" element={<UserProfile />} />

        <Route path="home" element={<AdminHome />} />
         <Route path="products" element={<ProductPage />} />
          <Route path="subcategory" element={<SubCategoryPage />} />

        {CategoryRoutes}

      </Route>

    </Routes>
  );
}

export default AdminRoutes;