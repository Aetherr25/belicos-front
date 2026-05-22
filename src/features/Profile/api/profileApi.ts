import apiClient from "../../../api/apiClient";  // ← 3 niveles
import type { ProfileResponse, UpdateProfilePayload } from "../types";

export const getProfile = async (): Promise<ProfileResponse> => {
  const { data } = await apiClient.get<ProfileResponse>("/me");
  return data;
};

export const updateProfile = async (payload: UpdateProfilePayload): Promise<void> => {
  await apiClient.put("/me", payload);
};