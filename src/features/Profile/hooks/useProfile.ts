import { useEffect, useState } from "react";
import { getProfile } from "../api/profileApi";
import type { ProfileResponse } from "../types";

export const useProfile = () => {
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProfile()
      .then(setProfile)
      .catch(() => setError("No se pudo cargar el perfil."))
      .finally(() => setLoading(false));
  }, []);

  return { profile, loading, error };
};