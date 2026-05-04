import { Routes, Route } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import UserDashboard from "../pages/UserDashboard";
import ProtectedRoute from "./ProtectedRoute";
function UserRoutes() {
  return (
    <Routes>
       <Route path="/user" element={
        <ProtectedRoute allowedRoles={["USER"]}>
          <UserLayout/>
        </ProtectedRoute>
      }
      >
      <Route index element={<UserDashboard />} />
        </Route>
    </Routes>
  );
}

export default UserRoutes;