import { UserCheck, UserX } from "lucide-react";
import type { User } from "../types";
import { usersApi } from "../api/api";
import { useState } from "react";

interface ToggleUserModalProps {
    isOpen: boolean;
    user: User | null;
    onClose: () => void;
    onConfirm: () => void;
}

export const ToggleUserModal = ({ isOpen, user, onClose, onConfirm }: ToggleUserModalProps) => {
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen || !user) return null;

    const isDeactivating = user.active;

    const handleToggle = async () => {
        setIsLoading(true);
        try {
            await usersApi.updateUser(user.userId, {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                roleId: user.roleId,
                active: !user.active,
            });
            onConfirm();
        } catch {
            alert("Error al cambiar estado del usuario");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-2xl flex flex-col items-center gap-5">
                <div className={`p-4 rounded-full ${isDeactivating ? "bg-red-100" : "bg-green-100"}`}>
                    {isDeactivating
                        ? <UserX className="w-10 h-10 text-red-500" />
                        : <UserCheck className="w-10 h-10 text-green-500" />
                    }
                </div>

                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {isDeactivating ? "Desactivar usuario" : "Activar usuario"}
                    </h2>
                    <p className="mt-2 text-gray-500">
                        ¿Estás seguro que deseas {isDeactivating ? "desactivar" : "activar"} a{" "}
                        <span className="font-semibold text-gray-800">{user.firstName} {user.lastName}</span>?
                    </p>
                </div>

                <div className="flex gap-4 w-full mt-2">
                    <button onClick={onClose}
                        className="w-full px-4 py-2 text-lg font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors hover:cursor-pointer">
                        Cancelar
                    </button>
                    <button onClick={handleToggle} disabled={isLoading}
                        className={`w-full px-4 py-2 text-lg font-medium text-white rounded-xl transition-colors hover:cursor-pointer ${isDeactivating ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"} ${isLoading ? "opacity-50" : ""}`}>
                        {isLoading ? "Procesando..." : isDeactivating ? "Desactivar" : "Activar"}
                    </button>
                </div>
            </div>
        </div>
    );
};