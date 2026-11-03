import { useCallback, useEffect, useState } from "react";
import { ordersApi } from "../api";
import type { Order } from "../types";

export const useGetAllOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOrders = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await ordersApi.getAll();
            setOrders(data);
        } catch {
            setError("Error al cargar los pedidos.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => { fetchOrders(); }, [fetchOrders]);

    return { orders, isLoading, error, refetch: fetchOrders };
};