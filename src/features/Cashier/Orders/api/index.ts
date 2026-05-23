import axios from "axios";
import type { Order } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5150/api";

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

export const ordersApi = {
    getAll: async (): Promise<Order[]> => {
        const { data } = await api.get("/orders");
        return data;
    },
    updateStatus: async (orderId: number, status: string): Promise<void> => {
        await api.patch(`/orders/${orderId}/status`, { status });
    },
};

