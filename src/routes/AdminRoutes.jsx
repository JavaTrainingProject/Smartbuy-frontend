import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import AdminDashboard from "../pages/AdminDashboard";
import CategoryRoutes from "./CategoryRoutes";
import AdminHome from "../pages/AdminHome";
import SubCategoryPage from "../pages/SubCategoryPage";
function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        
        <Route index element={<AdminDashboard />} />

        <Route path="home" element={<AdminHome />} />
<Route path="subcategories" element={<SubCategoryPage />}
        />

     
        {CategoryRoutes}
      </Route>
    </Routes>
  );
}


export default AdminRoutes;