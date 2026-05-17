export interface Product {
  productId: number;
  categoryId: number | null;
  categoryName: string;
  name: string;
  description: string;
  imageUrl?: string | null;
  imageFile?: File | null;
  price: number;
  stock: number;
  active: boolean;
  createdAt: Date;
  updatedAt?: Date | null;
}

export type UpdateProduct = Omit<Product, "productId" | "categoryName" | "createdAt" | "updatedAt">

export type CreateProduct = Omit<Product, "productId" | "categoryName" | "createdAt" | "updatedAt">