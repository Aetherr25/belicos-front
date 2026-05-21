
import { formatCurrencyMXN } from '../../../utils/helpers/formatCurrancyMXN';
import { ModalBase } from '../../Administrator/components/ModalBase'
import type { Product } from '../types';

const STORAGE_URL = (import.meta.env.VITE_API_URL || "http://localhost:5150/api").replace("/api", "");

interface DetailProductModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
}



export const DetailProductModal = ({
  isOpen,
  product,
  onClose
} : DetailProductModalProps) => {

  if(!product) return null;

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      title='Detalle'
      subtitle='Informacion completa del producto seleccionado'
    >
      
      <div 
        className="mt-5 flex flex-col gap-5"
      >
        <div className="flex flex-col gap-3 mb-2">
          <div className='flex justify-center my-5'>
            {product.imageUrl ? (
                <img
                  src={`${STORAGE_URL}/${product.imageUrl}`}
                  alt={product.name}
                  className="w-[80%] h-50 object-cover rounded-lg border border-gray-100 shadow-md"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.png";
                  }}
                />
              
                
              ) : (
                <div className="w-[80%] h-50 shadow-md rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                  Sin imagen
                </div>
              )}
            </div>
            <h3 
              className="text-2xl w-fit"
            >Nombre </h3>
            <p
              className='text-xl text-gray-700'>{product.name}</p>
          </div>
          <div 
            className="flex flex-col gap-3 mb-2"
          >
            <h3
              className="text-2xl w-fit"
            >Descripción</h3>
            <p
              className='text-xl text-gray-700'>{product.description}</p>
          </div>
          <div 
            className="flex flex-col gap-3 mb-2"
          >
            <h3
              className="text-2xl w-fit"
            >Precio</h3>
            <p
              className='text-xl text-gray-700'>{formatCurrencyMXN(product.price)}</p>
          </div>
          <div 
            className="flex flex-col gap-3 mb-2"
          >
            <h3
              className="text-2xl w-fit"
            >Stock</h3>
            <p
              className='text-xl text-gray-700'>{product.stock}</p>
          </div>
          <div
            className="flex gap-5 items-center">
            { product.active === true ? 
              <h3
                className="px-3 py-1 text-sm font-bold uppercase rounded-full bg-green-100 text-green-600"
              >Activo</h3>
                :
                <h3
                className="px-3 py-1 text-sm font-bold uppercase rounded-full bg-gray-500/20 text-gray-600"
              >Inactivo</h3>
            }
          </div>
        

        <div className="flex gap-4 mt-8">
          <button
            type="button"
            onClick={onClose}
            className="w-full px-4 py-2 text-xl font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors hover:cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </div>
    </ModalBase>
  )
}
