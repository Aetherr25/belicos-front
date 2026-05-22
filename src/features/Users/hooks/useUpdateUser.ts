import { useEffect, useState } from "react";
import type { UpdateUser } from "../types";
import { usersApi } from "../api/api";

const initialForm: UpdateUser = {
    firstName: "",
    lastName: "",
    email: "",
    roleId: 0,
    active: true,
};

export const useUpdateUser = (userId: number | null) => {
    const [formData, setFormData] = useState<UpdateUser>(initialForm);
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) { setFormData(initialForm); return; }

        const fetchUser = async () => {
            setIsLoading(true);
            try {
                const data = await usersApi.getById(userId);
                setFormData({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    roleId: data.roleId,
                    active: data.active,
                });
            } catch (err: any) {
                setError(err.message || "Error al obtener usuario");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    const handleChange = (name: keyof UpdateUser, value: string | number | boolean) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId) return false;
        setIsUpdating(true);
        try {
            await usersApi.updateUser(userId, formData);
            return true;
        } catch (err: any) {
            setError(err.message || "Error al actualizar usuario");
            return false;
        } finally {
            setIsUpdating(false);
        }
    };

    return { formData, isLoading, isUpdating, error, handleChange, handleSubmit };
};