import { useState } from "react";
import { saucesApi } from "../api";

interface CreateSauceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const CreateSauceModal = ({ isOpen, onClose, onConfirm }: CreateSauceModalProps) => {
  const [name, setName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsCreating(true);
    try {
      await saucesApi.create(name.trim());
      setName("");
      onConfirm();
      onClose();
    } catch {
      alert("Error al crear la salsa.");
    } finally {
      setIsCreating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-[90%] sm:max-w-md p-6 pt-8 bg-white rounded-2xl shadow-2xl">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-9 bg-green-500 rounded-full" />
          <h2 className="text-4xl font-medium">Crear</h2>
        </div>
        <p className="text-lg text-gray-700">Crea una nueva salsa.</p>
        <form className="mt-5 flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3 mb-2">
            <label htmlFor="name" className="text-2xl w-fit">Nombre:</label>
            <input
              type="text" 
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-200 rounded-lg py-2 px-3 text-lg"
              placeholder="Ej. Valentina"
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
              disabled={isCreating}
              className={`w-full px-4 py-2 text-xl font-medium text-white rounded-xl hover:cursor-pointer ${
                isCreating ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {isCreating ? "Creando..." : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};