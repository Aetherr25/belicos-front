import { useState } from "react";
import { NavbarAdmin } from "../../../components/NavbarAdmin";
import { PrimaryButton } from "../../../components/PrimaryButton";
import { BackButton } from "../../../components/BackButton";
import { TableUsers } from "../components/TableUsers";
import { CreateUserModal } from "../components/CreateUserModal";
import { useGetAllUsers } from "../hooks/useGetAllUsers";

export const UsersPage = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const { users, isLoading, error, refetch } = useGetAllUsers();

    return (
        <>
            <NavbarAdmin />
            <div className="max-w-[80%] mx-auto mt-20">
                <BackButton />
                <div className="lg:flex justify-between lg:items-end mb-20">
                    <div className="mb-10 lg:m-0">
                        <h1 className="text-5xl font-bold">Usuarios</h1>
                        <div className="mt-3 flex items-center gap-3">
                            <span className="text-red-600 text-4xl font-bold">|</span>
                            <p className="text-xl text-gray-600">
                                Puedes ver la lista de usuarios registrados. Puedes crear, editar y desactivar los existentes.
                            </p>
                        </div>
                    </div>
                    <PrimaryButton label="Agregar nuevo usuario" onClick={() => setIsCreateModalOpen(true)} />
                </div>

                <TableUsers users={users} isLoading={isLoading} error={error} refetch={refetch} />
            </div>

            <CreateUserModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onConfirm={refetch}
            />
        </>
    );
};