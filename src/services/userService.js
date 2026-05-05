import axiosInstance from "./axiosInstance";

export const updateUserProfile = async (id,data) => {
    const res = await axiosInstance.put(`/users/${id}`,data);
    return res.data;
};