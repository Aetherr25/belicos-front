import type { Sauce } from "../types";

interface DeleteSauceModalProps {
  isOpen: boolean;
  sauce: Sauce | null;
  onClose: () => void;
  onConfirm: (sauceId: number) => void;
}

export const DeleteSauceModal = ({ isOpen, sauce, onClose, onConfirm }: DeleteSauceModalProps) => {
  if (!isOpen || !sauce) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-[90%] sm:max-w-md p-6 pt-8 bg-white rounded-2xl shadow-2xl">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-9 bg-red-500 rounded-full" />
          <h2 className="text-4xl font-medium">Eliminar</h2>
        </div>
        <p className="text-lg text-gray-700 mt-2">
          ¿Estás seguro que deseas eliminar la salsa{" "}
          <span className="font-bold text-gray-900">"{sauce.name}"</span>?
          Esta acción no se puede deshacer.
        </p>
        <div className="flex gap-4 mt-8">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 text-xl font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 hover:cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(sauce.sauceId)}
            className="w-full px-4 py-2 text-xl font-medium text-white bg-red-500 rounded-xl hover:bg-red-600 hover:cursor-pointer"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};