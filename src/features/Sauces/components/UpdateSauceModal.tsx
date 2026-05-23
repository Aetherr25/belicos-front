import { useEffect, useState } from "react";
import { saucesApi } from "../api";
import type { Sauce } from "../types";

interface UpdateSauceModalProps {
  isOpen: boolean;
  sauceId: number | null;
  sauces: Sauce[];
  onClose: () => void;
  onConfirm: () => void;
}

export const UpdateSauceModal = ({ isOpen, sauceId, sauces, onClose, onConfirm }: UpdateSauceModalProps) => {
  const [name, setName] = useState("");
  const [active, setActive] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (sauceId !== null) {
      const sauce = sauces.find((s) => s.sauceId === sauceId);
      if (sauce) { setName(sauce.name); setActive(sauce.active); }
    }
  }, [sauceId, sauces]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || sauceId === null) return;
    setIsUpdating(true);
    try {
      await saucesApi.update(sauceId, name.trim(), active);
      onConfirm();
    } catch {
      alert("Error al actualizar la salsa.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-[90%] sm:max-w-md p-6 pt-8 bg-white rounded-2xl shadow-2xl">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-9 bg-yellow-400 rounded-full" />
          <h2 className="text-4xl font-medium">Editar</h2>
        </div>
        <p className="text-lg text-gray-700">Modifica los datos de la salsa.</p>
        <form className="mt-5 flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3 mb-2">
            <label className="text-2xl w-fit">Nombre:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-200 rounded-lg py-2 px-3 text-lg"
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="text-2xl w-fit">Activo:</label>
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="w-5 h-5 accent-green-500"
            />
          </div>
          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="w-full px-4 py-2 text-xl font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 hover:cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className={`w-full px-4 py-2 text-xl font-medium text-white rounded-xl hover:cursor-pointer ${
                isUpdating ? "bg-gray-400" : "bg-yellow-400 hover:bg-yellow-500"
              }`}
            >
              {isUpdating ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};