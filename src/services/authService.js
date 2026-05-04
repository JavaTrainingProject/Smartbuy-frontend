import axiosInstance from "./axiosInstance";

const BASE_URL = 'http://localhost:8080/api/auth';

const apiRequest = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  if (!response.ok) {
    throw {
      response: {
        data: result
      }
    };
  }

  return result;
};

export const loginUser = (loginData) =>{
    return apiRequest(`${BASE_URL}/login`,loginData);
};

export const registerUser = (registerData) =>{
    return apiRequest(`${BASE_URL}/user`,registerData)
};

export const logoutUser = async () =>{
  return await axiosInstance.post("/auth/logout");
};


let accessToken = null;
export const setAccessToken = (token) =>{
  accessToken = token;
  sessionStorage.setItem("accessToken", token);
  localStorage.setItem("accessToken", token);
};

export const getAccessToken = () => {
  return accessToken || localStorage.getItem("accessToken");
};

export const setRefreshToken = (token) =>{
  localStorage.setItem("refreshToken",token);
};

export const getRefreshToken = () =>{
  return localStorage.getItem("refreshToken");
};

export const clearTokens =() =>{
  accessToken = null;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("role");
};

