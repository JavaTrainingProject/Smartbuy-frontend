
import axiosInstance from "./axiosInstance";

export const login = async (credentials) => {
  const res = await axiosInstance.post("/api/auth/login", {   // ✅ FIX HERE
    email: credentials.email.trim().toLowerCase(),
    password: credentials.password.trim()
  });

  return res.data;
};