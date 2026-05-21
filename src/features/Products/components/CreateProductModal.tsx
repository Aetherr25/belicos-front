import { useCreateProduct } from "../hooks/useCreateProduct";
import { ModalBase } from "../../Administrator/components/ModalBase";
import { useGetAllActivesCategories } from "../../Categories/hooks/useGetAllActivesCategories";
import { ImageDropZone } from "./ImageDropZone";

interface ActiveToggleStaticProps {
  isOpen: boolean;
  onClose: () => void
  onConfirm: () => void
  children: React.ReactNode;
}

export const CreateProductModal = ({
  isOpen,
  onClose,
  onConfirm
}: ActiveToggleStaticProps) => {

  const { formData, isCreating, handleChange, handleSubmit, resetForm } = useCreateProduct();

  const { categories } = useGetAllActivesCategories();

  const handleFormSubmit = async (e: React.FormEvent) => {
    const success = await handleSubmit(e);

    if(success) {
      onConfirm();
      onClose();
      resetForm();
    }
  }


  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      title="Crear"
      subtitle="En este formulario puedes crear un nuevo producto">
      <form
        onSubmit={handleFormSubmit}
        className="mt-5 flex flex-col gap-5">
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
              value={formData?.price || ''} onChange={(e) => 
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
              value={formData?.stock || ''} 
              onChange={(e) => handleChange('stock', Number(e.target.value))} 
              className="bg-gray-200 rounded-lg py-2 px-3 text-lg" 
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
            disabled={isCreating}
            className={` w-full px-4 py-2 text-xl font-medium text-white rounded-xl transition-colors ${isCreating ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600 hover:cursor-pointer'}`}
          >
            {isCreating ? "Creando..." : "Crear"}
          </button>
        </div>
      </form>
    </ModalBase>
  )
}
