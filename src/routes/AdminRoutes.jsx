import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import AdminDashboard from "../pages/AdminDashboard";
import CategoryRoutes from "./CategoryRoutes";
import AdminHome from "../pages/AdminHome";
import SubCategoryPage from "../pages/SubCategoryPage";
import ProductPage from "../pages/ProductPage";
function AdminRoutes() {
  return (
    <Routes>
       <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="home" element={<AdminHome />} />
        <Route path="subcategories" element={<SubCategoryPage />} />
        <Route path="products" element={<ProductPage />} />
        {CategoryRoutes}
      </Route>
    </Routes>
  );
}


export default AdminRoutes;