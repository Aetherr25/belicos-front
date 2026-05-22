import axios from "axios";
import type { CreateUser, UpdateUser, User } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5150/api";

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

export const usersApi = {
    getAll: async (): Promise<User[]> => {
        const { data } = await api.get("/users");
        return data;
    },

    getById: async (userId: number): Promise<User> => {
        const { data } = await api.get(`/users/${userId}`);
        return data;
    },

    createUser: async (payload: CreateUser): Promise<User> => {
        const { data } = await api.post("/users", payload);
        return data;
    },

    updateUser: async (userId: number, payload: UpdateUser): Promise<void> => {
        await api.put(`/users/${userId}`, payload);
    },
};