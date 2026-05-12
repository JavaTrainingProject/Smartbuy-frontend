import { Routes, Route } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import VerifyOtp from "../pages/VerifyOtp";
import ProductPage from "../pages/ProductPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/user/home" element={<ProductPage />} />
    </Routes>
  );
}

export default AppRoutes;