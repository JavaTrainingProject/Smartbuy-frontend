import { Routes, Route } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import UserDashboard from "../pages/UserDasboard";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/user" element={<UserLayout />}>
        <Route index element={<UserDashboard />} />
      </Route>
    </Routes>
  );
}

export default UserRoutes;