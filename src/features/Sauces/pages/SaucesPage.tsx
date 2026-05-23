import { useState } from "react";
import { NavbarAdmin } from "../../../components/NavbarAdmin";
import { PrimaryButton } from "../../../components/PrimaryButton";
import { BackButton } from "../../../components/BackButton";
import { TableSauces } from "../components/TableSauces";
import { CreateSauceModal } from "../components/CreateSauceModal";
import { useGetAllSauces } from "../hooks/useGetAllSauces";

export const SaucesPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { sauces, isLoading, error, refetch } = useGetAllSauces();

  return (
    <>
      <NavbarAdmin />
      <div className="max-w-[80%] mx-auto mt-20">
        <BackButton />
        <div className="lg:flex justify-between lg:items-end mb-20">
          <div className="mb-10 lg:m-0">
            <h1 className="text-5xl font-bold">Salsas</h1>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-red-600 text-4xl font-bold">|</span>
              <p className="text-xl text-gray-600">
                Puedes ver la lista de salsas disponibles. Puedes crear, borrar y editar las existentes.
              </p>
            </div>
          </div>
          <PrimaryButton
            label="Agregar nueva salsa"
            onClick={() => setIsCreateModalOpen(true)}
          />
        </div>
        <TableSauces
          sauces={sauces}
          isLoading={isLoading}
          error={error}
          refetch={refetch}
        />
      </div>

      <CreateSauceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onConfirm={refetch}
      />
    </>
  );
};