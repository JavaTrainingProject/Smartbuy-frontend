// import { Routes, Route } from "react-router-dom";
// import UserLayout from "../layout/UserLayout";
// import UserDashboard from "../pages/UserDasboard";
// import ProtectedRoute from "./ProtectedRoute";
// import UserProfile from "../pages/UserProfile";
// import ProductPage from "../pages/ProductPage";
// function UserRoutes() {
//   return (
//     <Routes>
//        <Route path="/user" element={
//         <ProtectedRoute allowedRoles={["USER"]}>
//           <UserLayout/>
//         </ProtectedRoute>
//       }
//       >
//       <Route index element={<UserDashboard />} />
//       <Route path="profile" element={<UserProfile />} />
//       <Route path="products" element={<ProductPage />} />
//         </Route>
//     </Routes>
//   );
// }

// export default UserRoutes;




// import { Routes, Route } from "react-router-dom";
// import UserLayout from "../layout/UserLayout";
// import ProductPage from "../pages/ProductPage";

// function UserRoutes() {
//   return (
//     <Routes>
//       <Route path="/user" element={<UserLayout />}>
//         <Route path="products" element={<ProductPage />} />
//       </Route>
//     </Routes>
//   );
// }

// export default UserRoutes;



// import { Routes, Route } from "react-router-dom";
// import UserLayout from "../layout/UserLayout";
// import UserDashboard from "../pages/UserDashboard";
// import ProtectedRoute from "./ProtectedRoute";
// import UserProfile from "../pages/UserProfile";
// import ProductPage from "../pages/ProductPage";

// function UserRoutes() {
//   return (
//     <Routes>
//       <Route
//         path="/user"
//         element={
//           <ProtectedRoute allowedRoles={["USER"]}>
//             <UserLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<UserDashboard />} />
//         <Route path="profile" element={<UserProfile />} />
//         <Route path="products" element={<ProductPage />} />
//       </Route>
//     </Routes>
//   );
// }

// export default UserRoutes;



import { Routes, Route, Navigate } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import ProtectedRoute from "./ProtectedRoute";
import UserProfile from "../pages/UserProfile";
import ProductPage from "../pages/ProductPage";
import ProductRoutes from "./ProductRoutes";
function UserRoutes() {
  return (
    <Routes>
      <Route
        path="/user"
        element={
          <ProtectedRoute allowedRoles={["USER"]}>
            <UserLayout />
          </ProtectedRoute>
        }
      >
         <Route index element={<Navigate to="home" />} />
      {ProductRoutes}
      </Route>
    </Routes>
  );
}

export default UserRoutes;