import { NavbarCashier } from "../../../../components/NavbarCashier"
import { useGetAllActivesCategories } from "../../../Categories/hooks/useGetAllActivesCategories"
import { useGetAllProducts } from "../../../Products/hooks/useGetAllProducts";
import { CategoryFilterButton } from "../components/CategoryFilterButton"
import { ProductCard } from "../components/ProductCard";

const STORAGE_URL = (import.meta.env.VITE_API_URL || "http://localhost:5150/api").replace("/api", "");


export const Orders = () => {

  const {categories} = useGetAllActivesCategories();

  const {products} = useGetAllProducts();

  return (
    <>
      <NavbarCashier 
        CrearPedido={true}
      />

      <div className="flex gap-4  my-0.5 bg-white shadow-lg py-3 px-7">

        <CategoryFilterButton 
            label={"Todo"}
            isSelected={true}
          />

        {categories.map((category) => (
          <CategoryFilterButton 
            label={category.name}
            isSelected={false}
          />
        ))}
        
      </div>

      <div
        className="border"
      >
        {products.map((product) => (
          <ProductCard 
            image={`${STORAGE_URL}/${product.imageUrl}`}
            name={product.name}
            description={product.description}
            price={product.price}
            stock={product.stock}
          />
        ))}
      </div>
    </>
  )
}
