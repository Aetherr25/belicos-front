import { useEffect, useRef } from "react";
import { useUpdateProduct } from "../hooks/useUpdateProject";
import { SwitchActive } from "../../Administrator/components/SwitchActive";
import { ModalBase } from "../../Administrator/components/ModalBase";
import { ImageDropZone } from "./ImageDropZone";
import { useGetAllActivesCategories } from "../../Categories/hooks/useGetAllActivesCategories";

interface UpdateProductModalProps {
  isOpen: boolean;
  productId: number | null;
  onClose: () => void;
  onConfirm: (productId: number) => void;
}


export const UpdateProductModal = ({
  isOpen,
  productId,
  onClose,
  onConfirm
}: UpdateProductModalProps) => {

  const dialogRef = useRef<HTMLDialogElement>(null);

  const { formData, isUpdating, handleChange, handleSubmit } = useUpdateProduct(productId);

  const { categories } = useGetAllActivesCategories();

  const onFormSubmit = async(e: React.FormEvent) => {
    const result = await handleSubmit(e);

    if(result){
      if(onConfirm && productId) onConfirm(productId);
    }
  }

  useEffect(() => {
    const dialogElement = dialogRef.current;

    if(isOpen) {
      dialogElement?.showModal();
    } else {
      dialogElement?.close();
    }

  }, [isOpen]);

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      title="Actualizar"
      subtitle="Manipula los datos que deseas actualizar."
    >
      <form 
        onSubmit={onFormSubmit}
        className="mt-5 flex flex-col gap-5"
      >
        <ImageDropZone 
          selectedFile={formData.imageFile as File | null} 
          onImageChange={(file) => handleChange('imageFile', file)}
        />
        <div className="flex flex-col gap-3 mb-2">
            <label 
              htmlFor="name" 
              className="text-2xl w-fit"
            >Nombre: </label>
            <input 
              type="text" 
              name="name" 
              id="name" 
              value={formData?.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              className="bg-gray-200 rounded-lg py-2 px-3 text-lg"
            />
          </div>
          <div 
            className="flex flex-col gap-3 mb-2"
          >
            <label 
              htmlFor="description" 
              className="text-2xl w-fit"
            >Descripción:</label>
            <textarea 
              id="description" 
              name="description" 
              value={formData?.description || ''} 
              onChange={(e) => handleChange('description', e.target.value)} 
              className="bg-gray-200 rounded-lg py-2 px-3 text-lg" />
          </div>
          <div
            className="flex flex-col gap-3 mb-2">
              <label 
              htmlFor="description" 
              className="text-2xl w-fit">
                Categoría:</label>
              <select 
                name="category" 
                id="category"
                className="bg-gray-200 rounded-lg py-2 px-3 text-lg"
                value={formData.categoryId ?? ''}
                onChange={(e) => handleChange("categoryId", Number(e.target.value))}>
                  <option 
                    value=""
                    disabled
                    className=""> == Selecciona una categoria ==</option>
                    {categories.map((category) => (
                      <option 
                        key={category.categoryId}
                        value={category.categoryId}>
                          {category.name}
                        </option>
                    ))}
                </select>
          </div>
          <div 
            className="flex flex-col gap-3 mb-2"
          >
            <label 
              htmlFor="price" 
              className="text-2xl w-fit"
            >Precio:</label>
            <input 
              type="number" 
              step="0.01" 
              id="price" 
              name="price"  
              value={formData?.price || 0} onChange={(e) => 
              handleChange('price', Number(e.target.value))} 
              className="bg-gray-200 rounded-lg py-2 px-3 text-lg" />
          </div>
          <div 
            className="flex flex-col gap-3 mb-2"
          >
            <label 
              htmlFor="stock" 
              className="text-2xl w-fit"
            >Stock:</label>
            <input 
              type="number" 
              id="stock" 
              name="stock" 
              value={formData?.stock || 0} 
              onChange={(e) => handleChange('stock', Number(e.target.value))} 
              className="bg-gray-200 rounded-lg py-2 px-3 text-lg" 
            />
          </div>
          <div
            className="flex gap-5 items-center">
            <label 
              htmlFor="name"
              className="text-2xl w-fit"
            >Activo</label>
            <SwitchActive 
              checked={formData.active}
              onChange={(value) => handleChange('active', value)}
            />
          </div>
        

        <div className="flex gap-4 mt-8">
          <button
            type="button"
            onClick={onClose}
            className="w-full px-4 py-2 text-xl font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors hover:cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isUpdating}
            className={` w-full px-4 py-2 text-xl font-medium text-white rounded-xl transition-colors ${isUpdating ? 'bg-gray-400' : 'bg-yellow-400 hover:bg-yellow-500 hover:cursor-pointer'}`}
          >
            {isUpdating ? "Actualizando..." : "Actualizar"}
          </button>
        </div>
      </form>
    </ModalBase>
  )
}
