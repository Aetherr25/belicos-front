import http from "../../../api/apiClient";
import type { Sauce } from "../types";

export const saucesApi = {
  getAll: async (): Promise<Sauce[]> => {
    const { data } = await http.get<Sauce[]>("/sauces");
    return data;
  },
  create: async (name: string): Promise<Sauce> => {
    const { data } = await http.post<Sauce>("/sauces", { name });
    return data;
  },
  update: async (sauceId: number, name: string, active: boolean): Promise<void> => {
    await http.put(`/sauces/${sauceId}`, { name, active });
  },
  delete: async (sauceId: number): Promise<void> => {
    await http.delete(`/sauces/${sauceId}`);
  },
};