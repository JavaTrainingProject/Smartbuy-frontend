import { Routes, Route } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import UserDashboard from "../pages/UserDasboard";
import ProtectedRoute from "./ProtectedRoute";
import UserProfile from "../pages/UserProfile";
function UserRoutes() {
  return (
    <Routes>
       <Route  element={
        <ProtectedRoute allowedRoles={["USER"]}>
          <UserLayout/>
        </ProtectedRoute>
      }
      >
      <Route index element={<UserDashboard />} />
      <Route path="profile" element={<UserProfile />} />
        </Route>
    </Routes>
  );
}

export default UserRoutes;