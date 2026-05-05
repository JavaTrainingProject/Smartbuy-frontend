import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import AdminDashboard from "../pages/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";
function AdminRoutes() {
  return (
    <Routes>
        <Route path="/admin" element={
        <ProtectedRoute allowedRoles={["ADMIN"]}>
          <AdminLayout />
        </ProtectedRoute>
      }
      >
      <Route index element={<AdminDashboard />} />
        </Route>
      </Routes>
  );
}


export default AdminRoutes;