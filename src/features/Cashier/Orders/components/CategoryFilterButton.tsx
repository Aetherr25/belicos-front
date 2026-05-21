
interface CategoryFilterButtonProps {
  label: string;
  isSelected: boolean;
}

export const CategoryFilterButton = ({label, isSelected} : CategoryFilterButtonProps) => {
  return (
    <button 
      type="button"
      className={isSelected ? "py-2 px-3 bg-red-500 rounded-lg shadow-md hover:bg-red-600 text-white font-semibold hover:cursor-pointer transition-colors duration-300 ease-in-out "
        : "py-2 px-3 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 hover:cursor-pointer transition-colors duration-300 ease-in-out"
      }
    >
      <span>{label}</span>
    </button>
  )
}
