import { useState } from "react";
import { ordersApi } from "../api";

export const useUpdateOrderStatus = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateStatus = async (orderId: number, status: string): Promise<boolean> => {
        setIsUpdating(true);
        setError(null);
        try {
            await ordersApi.updateStatus(orderId, status);
            return true;
        } catch {
            setError("Error al actualizar el estatus.");
            return false;
        } finally {
            setIsUpdating(false);
        }
    };

    return { updateStatus, isUpdating, error };
};