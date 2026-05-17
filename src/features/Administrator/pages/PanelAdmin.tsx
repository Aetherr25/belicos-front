import { Droplet, Grid2x2Plus, ShoppingCart } from "lucide-react";
import { NavbarAdmin } from "../../../components/NavbarAdmin";
import { ItemCard } from "../components/ItemCard";

export const PanelAdmin = () => {


  return (
    <>
      <NavbarAdmin 
        PanelAdmin={true}
      />
      <div
        className="max-w-[80%] mx-auto mt-20"
      >
        <div>
          <h1
            className="text-5xl font-bold"
          >Panel de administrador</h1>
          <div
            className="mt-3 flex items-center gap-3"
          >
            <span className="text-red-500 text-4xl font-bold">
              |
            </span>
            <p
              className="text-xl text-gray-600"
            >En esta pantalla puedes acceder a gestionar tus productos, salsas y cateogorías</p>
          </div>
        </div>
        <div
          className="mt-20 flex:col md:flex justify-center gap-10"
        >
          <ItemCard
            title="Gestionar Productos"
            description="Agrega productos a tu menú"
            icon={ShoppingCart}
            to="/ProductsPage"
          />
          <ItemCard
            title="Gestionar Categorías"
            description="Agrega categorías para identificar mas rápido tus productos"
            icon={Grid2x2Plus}
            to="/CategoriesPage"
          />
          <ItemCard
            title="Gestionar Salsas"
            description="Agrega salsas que puedes agregar a tus pedidos"
            icon={Droplet}
            to="/SaucesPage"
          />
        </div>
        
      </div>
    </>
    
  )
}
