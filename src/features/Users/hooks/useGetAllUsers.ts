import { useEffect, useState } from "react";
import type { User } from "../types";
import { usersApi } from "../api/api";

export const useGetAllUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await usersApi.getAll();
            setUsers(data);
        } catch (err: any) {
            setError(err.message || "Error al obtener usuarios");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchUsers(); }, []);

    return { users, isLoading, error, refetch: fetchUsers };
};