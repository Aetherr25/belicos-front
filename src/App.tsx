// App.tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./features/auth/components/ProtectedRoute";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { routes } from "./route/router";

export const App = () => {
  const checkSession = useAuthStore((state) => state.checkSession);
  const isCheckingSession = useAuthStore((state) => state.isCheckingSession);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  if (isCheckingSession) {
    return (
      <div className="h-lvh flex justify-center items-center">
        <h2>Cargando app...</h2>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.isProtected ? (
                <ProtectedRoute allowedRoles={route.allowedRoles}>
                  {route.element}
                </ProtectedRoute>
              ) : (
                route.element
              )
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};