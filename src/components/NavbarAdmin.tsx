import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { CircleUser, Search, Settings, SquareArrowRightExit } from "lucide-react";

interface NavbarAdminProps {
  PanelAdmin?: boolean;
  ReporteVentas?: boolean;
}

export const NavbarAdmin = ({
  PanelAdmin,
  ReporteVentas
}: NavbarAdminProps) => {

  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const logout = useAuthStore((state) => state.logout);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const active = "text-red-600 font-semibold border-b-2 border-red-600"

  

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex items-center justify-between w-full px-6 py-4 bg-white border-b border-gray-100">
      
      {/* Sección Izquierda: Logotipo y Nombre del proyecto */}
      {/* Agrupo los textos en una columna. Siempre estarán visibles, sin importar la pantalla. */}
      <div 
        className="flex flex-col"
      >
        <h1 className="text-2xl font-bold text-gray-900 leading-none">
          Panel de Admin
        </h1>
        <span className="text-[10px] font-bold text-red-600 tracking-widest uppercase mt-1">
          Bélicos Boneless
        </span>
      </div>

      {/* Sección Central: Enlaces de navegación */}
      {/* Oculto esta sección en móvil (hidden) porque ocuparía mucho espacio. La muestro a partir de pantallas medianas (md:flex). */}
      <nav className="hidden md:flex items-center gap-8 mt-1">
        {/* Aquí marco mi enlace activo con el texto y el borde inferior en color rojo */}
        <a 
          className={` pb-1 hover:cursor-pointer ${PanelAdmin ? active : 'text-gray-500 font-medium transition-colors'}`}
          onClick={() => navigate("/PanelAdmin")}
        >
          Panel de admin
        </a>

        <a 
          className={`pb-1 hover:cursor-pointer ${ReporteVentas ? active : 'text-gray-500 font-medium transition-colors'}`}
          onClick={() => navigate("/ReporteVentas")}
        >
          Reporte de ventas
        </a>
      </nav>

      {/* Sección Derecha: Buscador y Botón de Usuario */}
      <div className="flex items-center gap-4">
        
        {/* El contenedor del buscador también lo oculto en móvil para mantener la interfaz limpia. */}
        <div className="hidden md:flex items-center bg-gray-50 px-3 py-2 rounded-md border border-transparent focus-within:border-gray-200 focus-within:bg-white transition-all md:gap-3">
          
          
          <Search width={24}/>
          <input
            type="text"
            placeholder="Buscar..."
            className="bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400 w-48"
          />
        </div>

        {/* Aquí dejo el span que me pediste como botón/ícono para el perfil o menú del admin. */}
        {/* A este sí lo dejo visible en móvil para que el usuario siempre pueda acceder a sus opciones. */}
        <div className="relative" ref={dropdownRef}>
          
          {/* Tu botón original, ahora con el evento onClick */}
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="shadow-md border border-black/10 rounded-full p-1.5 flex focus:outline-none focus:ring-2 focus:ring-red-600/50 transition-all hover:cursor-pointer"
          >
            <CircleUser width={28} strokeWidth={1.5}/>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-xl z-50 flex flex-col py-2">
              
              <a
                onClick={() => { navigate("/profile/edit"); setIsDropdownOpen(false); }}
  className="px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors flex items-center gap-2 hover:cursor-pointer"
>
  <CircleUser width={24} strokeWidth={1.5}/>
  Mi Perfil
</a>
              
              {/* <a
                href="#"
                className="px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors flex items-center gap-2"
              >
                <Settings width={24} strokeWidth={1.5}/>
                Configuración
              </a> */}
              
              <hr className="my-1 border-gray-100" />
              
              <button
                type="button"
                className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 text-left w-full hover:cursor-pointer"
                onClick={() => logout()}
              >
                <SquareArrowRightExit width={24} strokeWidth={1.5}/>
                Cerrar Sesión
              </button>
            </div>
          )}
          
        </div>

      </div>
    </header>
  );
}
