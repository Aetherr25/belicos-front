import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import type { Sauce } from "../types";
import { DeleteSauceModal } from "./DeleteSauceModal";
import { UpdateSauceModal } from "./UpdateSauceModal";
import { saucesApi } from "../api";

interface TableSaucesProps {
  sauces: Sauce[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const TableSauces = ({ sauces, isLoading, error, refetch }: TableSaucesProps) => {
  const [sauceToDelete, setSauceToDelete] = useState<Sauce | null>(null);
  const [sauceToEditId, setSauceToEditId] = useState<number | null>(null);

  const handleDeleteConfirm = async (sauceId: number) => {
    try {
      await saucesApi.delete(sauceId);
      setSauceToDelete(null);
      refetch();
    } catch {
      alert("Hubo un problema al eliminar.");
    }
  };

  if (isLoading) return (
    <div className="w-full p-10 text-center text-gray-500 bg-white rounded-2xl shadow-xl">
      Cargando salsas...
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
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Estado</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sauces.map((sauce) => (
              <tr key={sauce.sauceId} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-5 text-md text-gray-400 font-medium">#{sauce.sauceId}</td>
                <td className="px-6 py-5 text-md font-bold text-gray-800">{sauce.name}</td>
                <td className="px-6 py-5 text-center">
                  {sauce.active ? (
                    <span className="px-3 py-1 text-sm font-bold uppercase rounded-full bg-green-100 text-green-600">Activo</span>
                  ) : (
                    <span className="px-3 py-1 text-sm font-bold uppercase rounded-full bg-gray-500/20 text-gray-600">Inactivo</span>
                  )}
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-10 text-gray-400">
                    <Pencil
                      className="w-6 h-6 hover:cursor-pointer hover:text-yellow-500 transition-colors duration-300"
                      onClick={() => setSauceToEditId(sauce.sauceId)}
                    />
                    <Trash2
                      className="w-6 h-6 hover:cursor-pointer hover:text-red-600 transition-colors duration-300"
                      onClick={() => setSauceToDelete(sauce)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteSauceModal
        isOpen={sauceToDelete !== null}
        sauce={sauceToDelete}
        onClose={() => setSauceToDelete(null)}
        onConfirm={handleDeleteConfirm}
      />

      <UpdateSauceModal
        isOpen={sauceToEditId !== null}
        sauceId={sauceToEditId}
        sauces={sauces}
        onClose={() => setSauceToEditId(null)}
        onConfirm={() => { setSauceToEditId(null); refetch(); }}
      />
    </>
  );
};