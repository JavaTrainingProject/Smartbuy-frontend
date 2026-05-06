const BASE_URL = "http://localhost:8080/api/admin/dashboard";

export const getDashboardStats = async() =>{
    const token = localStorage.getItem("token");

const response = await fetch(`${BASE_URL}/stats`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
if (!response.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }

  return response.json();
};