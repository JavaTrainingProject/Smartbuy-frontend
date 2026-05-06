import { Route } from "react-router-dom";
import CategoryPage from "../pages/Category";

const CategoryRoutes = (
  <>
    <Route path="category" element={<CategoryPage />} />
  </>
);

export default CategoryRoutes;