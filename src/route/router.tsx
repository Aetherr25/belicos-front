// router.tsx
import { Navigate } from "react-router-dom";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { PanelAdmin } from "../features/Administrator/pages/PanelAdmin";
import { SalesReport } from "../features/Administrator/pages/SalesReport";
import { CategoriesPage } from "../features/Categories/pages/CategoriesPage";
import { ProductsPage } from "../features/Products/Page/ProductsPage";
import { SaucesPage } from "../features/Sauces/pages/SaucesPage";
import { PanelCashier } from "../features/Cashier/pages/PanelCashier";
import { Inventory } from "../features/Cashier/pages/Inventory";
import { CashRegistration } from "../features/Cashier/pages/CashRegistration";
import { Orders } from "../features/Cashier/Orders/pages/Orders";
import EditProfilePage from "../features/Profile/pages/EditProfilePage";
import { UsersPage } from "../features/Users/pages/UsersPage";

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  allowedRoles?: string[]; // roles que pueden acceder
  isProtected?: boolean; // si requiere autenticación
}

export const routes: RouteConfig[] = [
  {
    path: "/",
    element: <div>Renderizar Menu Aquí</div>,
    isProtected: false,
  },
  {
    path: "/login",
    element: <LoginPage />,
    isProtected: false,
  },
  // Rutas solo para Administrador
  {
    path: "/PanelAdmin",
    element: <PanelAdmin />,
    allowedRoles: ["Administrador"],
    isProtected: true,
    },
    {
        path: "/UsersPage",
        element: <UsersPage />,
        allowedRoles: ["Administrador"],
        isProtected: true,
    },
  {
    path: "/ReporteVentas",
    element: <SalesReport />,
    allowedRoles: ["Administrador"],
    isProtected: true,
  },
  
  {
    path: "/CategoriesPage",
    element: <CategoriesPage />,
    allowedRoles: ["Administrador", "Cajero"],
    isProtected: true,
  },
  {
    path: "/ProductsPage",
    element: <ProductsPage />,
    allowedRoles: ["Administrador", "Cajero"],
    isProtected: true,
  },
  {
    path: "/SaucesPage",
    element: <SaucesPage />,
    allowedRoles: ["Administrador", "Cajero"],
    isProtected: true,
  },

  {
    path: "/panel-cajero",
    element: <PanelCashier/>,
    allowedRoles: ["Cajero"],
    isProtected: true,
  },

  {
    path: "/inventario",
    element: <Inventory/>,
    allowedRoles: ["Cajero"],
    isProtected: true,
  },

  {
    path: "/caja",
    element: <CashRegistration/>,
    allowedRoles: ["Cajero"],
    isProtected: true,
  },

  {
    path: "/crear-pedido",
    element: <Orders/>,
    allowedRoles: ["Cajero"],
    isProtected: true,
  },

  {
  path: "/profile/edit",
  element: <EditProfilePage />,
  isProtected: true,
  allowedRoles: ["Administrador", "Cajero"],
  },

  {
    path: "*",
    element: <Navigate to="/" replace />,
    isProtected: false,
  },
  
];