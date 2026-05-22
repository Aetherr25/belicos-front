import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";
import { useUpdateProfile } from "../hooks/useUpdateProfile";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const { profile, loading: loadingProfile } = useProfile();
  const { execute, loading, error, success } = useUpdateProfile();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
    }
  }, [profile]);

  const handleSubmit = () => {
    execute({
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      currentPassword: currentPassword || undefined,
      newPassword: newPassword || undefined,
    });
  };

  if (loadingProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-gray-500">Cargando perfil...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] px-6 py-10">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1A1A1B]">Editar Perfil</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-1 h-5 bg-[#E61919] rounded-full" />
            <p className="text-gray-500 text-sm">
              Actualiza tu información personal y configuración de seguridad.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-10">

          {/* Información Personal */}
          <section>
            <h2 className="text-lg font-semibold text-[#1A1A1B] mb-5">
              Información Personal
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm text-gray-500 mb-1">Nombre(s)</label>
                <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-[#F8F9FA] focus-within:border-[#E61919] transition-colors">
                  <span className="material-icons text-gray-400 text-lg mr-2">person</span>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Ej. Juan"
                    className="flex-1 bg-transparent text-sm text-[#1A1A1B] outline-none placeholder:text-gray-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Apellidos</label>
                <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-[#F8F9FA] focus-within:border-[#E61919] transition-colors">
                  <span className="material-icons text-gray-400 text-lg mr-2">person</span>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Ej. Pérez"
                    className="flex-1 bg-transparent text-sm text-[#1A1A1B] outline-none placeholder:text-gray-300"
                  />
                </div>
              </div>

            </div>
          </section>

          {/* Seguridad */}
          <section>
            <h2 className="text-lg font-semibold text-[#1A1A1B] mb-5">Seguridad</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm text-gray-500 mb-1">Contraseña actual</label>
                <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-[#F8F9FA] focus-within:border-[#E61919] transition-colors">
                  <span className="material-icons text-gray-400 text-lg mr-2">lock</span>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="flex-1 bg-transparent text-sm text-[#1A1A1B] outline-none placeholder:text-gray-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Nueva contraseña</label>
                <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-[#F8F9FA] focus-within:border-[#E61919] transition-colors">
                  <span className="material-icons text-gray-400 text-lg mr-2">key</span>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    className="flex-1 bg-transparent text-sm text-[#1A1A1B] outline-none placeholder:text-gray-300"
                  />
                </div>
              </div>

            </div>
          </section>

          {/* Feedback */}
          {error && (
            <p className="text-sm text-[#E61919] bg-red-50 border border-red-100 rounded-lg px-4 py-2">
              {error}
            </p>
          )}
          {success && (
            <p className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg px-4 py-2">
              Cambios guardados correctamente.
            </p>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 text-sm font-medium text-gray-500 hover:text-[#1A1A1B] transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#E61919] hover:bg-red-700 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              <span className="material-icons text-base">save</span>
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}