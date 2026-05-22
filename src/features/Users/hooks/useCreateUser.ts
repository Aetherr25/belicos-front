import { useState } from "react";
import type { CreateUser } from "../types";
import { usersApi } from "../api/api";

const initialForm: CreateUser = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roleId: 0,
};

export const useCreateUser = () => {
    const [formData, setFormData] = useState<CreateUser>(initialForm);
    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (name: keyof CreateUser, value: string | number) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsCreating(true);
        setError(null);
        try {
            await usersApi.createUser(formData);
            return true;
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || "Error al crear usuario");
            return false;
        } finally {
            setIsCreating(false);
        }
    };

    const resetForm = () => setFormData(initialForm);

    return { formData, isCreating, error, handleChange, handleSubmit, resetForm };
};