import { useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import type { LoginRequest } from "../types/auth.type";
import { authService } from "../api/auth.api";
import axios from "axios";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const login = async (credentials: LoginRequest) => {
    setIsLoading(true);
    setError(null);

    try {

      const userData = await authService.login(credentials);
      
      setAuth(userData);

      if(userData){

        switch(userData.roleName){
          case "Administrador":
            navigate("/PanelAdmin");
            break;
          case "Cajero": 
            navigate("/panel-cajero");
            break;
          default:
            console.warn(`Rol no reconocido: ${userData.roleName}`);
            navigate("/");
            break;
        }
      }

    } catch (err: unknown) {
      if(axios.isAxiosError(err)){
        const errorMessage = err.response?.data?.message || "Credenciales Inválidas"
        setError(errorMessage);
      } else {
        setError("Ocurrió un error inesperado al procesar tu solicitud.")
      }

    } finally {
      setIsLoading(false);
    }

  }
  
  return {login, isLoading, error}
}