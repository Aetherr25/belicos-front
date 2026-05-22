import { Pencil, UserX } from "lucide-react";
import type { User } from "../types";
import { useState } from "react";
import { UpdateUserModal } from "./UpdateUserModal";
import { ToggleUserModal } from "./ToggleUserModal";

interface TableUsersProps {
    users: User[];
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
}

export const TableUsers = ({ users, isLoading, error, refetch }: TableUsersProps) => {
    const [userToToggle, setUserToToggle] = useState<User | null>(null);
    const [userToEditId, setUserToEditId] = useState<number | null>(null);

    if (isLoading) return (
        <div className="w-full p-10 text-center text-gray-500 bg-white rounded-2xl shadow-xl">
            Cargando usuarios...
        </div>
    );

    if (error) return (
        <div className="w-full p-10 text-center text-red-500 bg-white rounded-2xl shadow-xl">
            Error al cargar: {error}
        </div>
    );

    return (
        <>
            <div className="w-full overflow-hidden shadow-xl rounded-2xl border border-gray-100 bg-white">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Nombre</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Rol</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Estado</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map((user) => (
                            <tr key={user.userId} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-5 text-md text-gray-400 font-medium">#{user.userId}</td>
                                <td className="px-6 py-5 text-md font-bold text-gray-800">
                                    {user.firstName} {user.lastName}
                                </td>
                                <td className="px-6 py-5 text-md text-gray-500">{user.email}</td>
                                <td className="px-6 py-5 text-md text-gray-500">
                                    <span className={`px-3 py-1 text-sm font-bold uppercase rounded-full ${user.roleName === "Administrador"
                                            ? "bg-red-100 text-red-600"
                                            : "bg-blue-100 text-blue-600"
                                        }`}>
                                        {user.roleName}
                                    </span>
                                </td>
                                <td className="px-6 py-5 text-center">
                                    {user.active
                                        ? <span className="px-3 py-1 text-sm font-bold uppercase rounded-full bg-green-100 text-green-600">Activo</span>
                                        : <span className="px-3 py-1 text-sm font-bold uppercase rounded-full bg-gray-500/20 text-gray-600">Inactivo</span>
                                    }
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <div className="flex justify-end gap-10 text-gray-400">
                                        <Pencil
                                            className="w-6 h-6 hover:cursor-pointer hover:text-yellow-500 transition-colors duration-300"
                                            onClick={() => setUserToEditId(user.userId)}
                                        />
                                        <UserX
                                            className={`w-6 h-6 hover:cursor-pointer transition-colors duration-300 ${user.active ? "hover:text-red-600" : "hover:text-green-600"}`}
                                            onClick={() => setUserToToggle(user)}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <UpdateUserModal
                isOpen={userToEditId !== null}
                userId={userToEditId}
                onClose={() => setUserToEditId(null)}
                onConfirm={() => { setUserToEditId(null); refetch(); }}
            />

            <ToggleUserModal
                isOpen={userToToggle !== null}
                user={userToToggle}
                onClose={() => setUserToToggle(null)}
                onConfirm={() => { setUserToToggle(null); refetch(); }}
            />
        </>
    );
};