import { useState } from "react";
import { updateProfile } from "../api/profileApi";
import type { UpdateProfilePayload } from "../types";

export const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const execute = async (payload: UpdateProfilePayload) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await updateProfile(payload);
      setSuccess(true);
    } catch (e: any) {
      setError(e?.response?.data?.message ?? "Error al guardar cambios.");
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error, success };
};