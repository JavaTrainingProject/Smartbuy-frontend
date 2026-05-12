import { getAccessToken } from "./authService";

const BASE_URL = "http://localhost:8080/api/admin";

export const getDashboardStats = async() =>{
    const token = getAccessToken();

const response = await fetch(`${BASE_URL}/stats`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
if (!response.ok) {


  const errorText = await response.text();

 
    throw new Error(errorText);
  }

  return response.json();
};