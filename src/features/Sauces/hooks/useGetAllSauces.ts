import { useCallback, useEffect, useState } from "react";
import { saucesApi } from "../api";
import type { Sauce } from "../types";

export const useGetAllSauces = () => {
  const [sauces, setSauces] = useState<Sauce[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSauces = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await saucesApi.getAll();
      setSauces(data);
    } catch {
      setError("Error al cargar las salsas.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchSauces(); }, [fetchSauces]);

  return { sauces, isLoading, error, refetch: fetchSauces };
};