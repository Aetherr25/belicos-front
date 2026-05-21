import http from "../../../api/apiClient";
import type { Product } from "../types";


export const productsApi = {
  getAll: async (): Promise<Product[]> => {

    const response = await http.get<Product[]>("/products");

    return response.data;
  },

  delete: async (productId: number): Promise<void> => {

    await http.delete(`/products/${productId}`);
  },

  getById: async (productId: number): Promise<Product> => {
    
    const response = await http.get<Product>(`/products/${productId}`);

    return response.data;
  },

  updateProduct: async (productId: number, data: FormData) => {
  const response = await http.put(`/products/${productId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
},

  createProduct: async (data: FormData) => {
    const response = await http.post("/products", data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
}