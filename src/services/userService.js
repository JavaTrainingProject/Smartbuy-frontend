import axiosInstance from "./axiosInstance";

export const updateUserProfile = async (id,data) => {
    const res = await axiosInstance.put(`/users/${id}`,data);
    return res.data;

};

export const getUserById = async (id) => {
    const res = await axiosInstance.get(`/users/${id}`);
    return res.data;
};