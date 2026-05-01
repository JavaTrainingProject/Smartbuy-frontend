import { Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import UserDashboard from "../pages/UserDasboard";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/user" element={<Layout />}>
        <Route index element={<UserDashboard />} />
      </Route>
    </Routes>
  );
}

export default UserRoutes;