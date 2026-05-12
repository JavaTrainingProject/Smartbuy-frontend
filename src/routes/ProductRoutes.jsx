import { Route } from "react-router-dom";

import ProductPage from "../pages/ProductPage";
import UserProfile from "../pages/UserProfile";

const ProductRoutes = (
  <>
    <Route path="home" element={<ProductPage />} />

   

    <Route path="profile" element={<UserProfile />} />
  </>
);

export default ProductRoutes;