
interface ProductCardProps {
  image?: string,
  name: string;
  description: string;
  price: number;
  stock: number;
  onAdd?: () => void;
}

export const ProductCard = ({
  image,
  name,
  description,
  price,
  stock,
  onAdd
} : ProductCardProps) => {
  return (
    <div className="w-52 bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
      {/* Imagen */}
      <div className="h-44 overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={image}
          alt={name}
        />
      </div>

      {/* Contenido */}
      <div className="p-3 flex flex-col gap-1 flex-1">
        <h3 className="font-bold text-gray-900 text-sm leading-tight">{name}</h3>
        <p className="text-gray-400 text-xs line-clamp-2">{description}</p>

        <p className="text-red-500 font-bold text-base mt-1">
          ${price.toFixed(2)}
        </p>

        <button
          onClick={onAdd}
          disabled={stock === 0}
          className="mt-auto w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-semibold py-2 rounded-xl transition-colors duration-150"
        >
          {/* Ícono carrito */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m5-9l2 9"
            />
          </svg>
          {stock === 0 ? "Sin stock" : "Agregar"}
        </button>
      </div>
    </div>
  );
}
