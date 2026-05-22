import { ModalBase } from "../../Administrator/components/ModalBase";
import { SwitchActive } from "../../Administrator/components/SwitchActive";
import { useUpdateUser } from "../hooks/useUpdateUser";

const ROLES = [
    { id: 1, name: "Administrador" },
    { id: 2, name: "Cajero" },
];

interface UpdateUserModalProps {
    isOpen: boolean;
    userId: number | null;
    onClose: () => void;
    onConfirm: () => void;
}

export const UpdateUserModal = ({ isOpen, userId, onClose, onConfirm }: UpdateUserModalProps) => {
    const { formData, isLoading, isUpdating, error, handleChange, handleSubmit } = useUpdateUser(userId);

    const onFormSubmit = async (e: React.FormEvent) => {
        const success = await handleSubmit(e);
        if (success) { onConfirm(); onClose(); }
    };

    const inputClass = "bg-gray-100 rounded-lg py-2 px-3 text-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-400";
    const labelClass = "text-lg font-medium text-gray-700";

    return (
        <ModalBase isOpen={isOpen} onClose={onClose} title="Actualizar" subtitle="Modifica los datos del usuario.">
            {isLoading ? (
                <p className="mt-6 text-gray-500 text-center">Cargando datos...</p>
            ) : (
                <form onSubmit={onFormSubmit} className="mt-5 flex flex-col gap-4">

                    <div className="flex gap-4">
                        <div className="flex flex-col gap-2 flex-1">
                            <label className={labelClass}>Nombre</label>
                            <input type="text" value={formData.firstName} onChange={(e) => handleChange("firstName", e.target.value)}
                                className={inputClass} required />
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                            <label className={labelClass}>Apellido</label>
                            <input type="text" value={formData.lastName} onChange={(e) => handleChange("lastName", e.target.value)}
                                className={inputClass} required />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className={labelClass}>Correo electrónico</label>
                        <input type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)}
                            className={inputClass} required />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className={labelClass}>Rol</label>
                        <select value={formData.roleId || ""} onChange={(e) => handleChange("roleId", Number(e.target.value))}
                            className={inputClass} required>
                            <option value="" disabled>== Selecciona un rol ==</option>
                            {ROLES.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
                        </select>
                    </div>

                    <SwitchActive
                        label="Activo"
                        checked={formData.active}
                        onChange={(val) => handleChange("active", val)}
                    />

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <div className="flex gap-4 mt-4">
                        <button type="button" onClick={onClose}
                            className="w-full px-4 py-2 text-xl font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors hover:cursor-pointer">
                            Cancelar
                        </button>
                        <button type="submit" disabled={isUpdating}
                            className={`w-full px-4 py-2 text-xl font-medium text-white rounded-xl transition-colors ${isUpdating ? "bg-gray-400" : "bg-yellow-400 hover:bg-yellow-500 hover:cursor-pointer"}`}>
                            {isUpdating ? "Actualizando..." : "Actualizar"}
                        </button>
                    </div>
                </form>
            )}
        </ModalBase>
    );
};