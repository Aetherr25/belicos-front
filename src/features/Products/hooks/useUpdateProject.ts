import { useEffect, useState } from "react";
import type { Product, UpdateProduct } from "../types"
import { productsApi } from "../api";

const initialFormState = {
  categoryId: null,
  name: '',
  description: '',
  imageFile: null,
  price: 0,
  stock: 0,
  active: true,
}

export const useUpdateProduct = (productId: number | null) => {
  
  const [product, setProduct] = useState<Product | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [formData, setFormData] = useState<UpdateProduct>(initialFormState);

  useEffect(() => {
    
    if(!productId){
      setProduct(null);
      setFormData(initialFormState);
      return;
    }

    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await productsApi.getById(productId);

        setProduct(data);

        setFormData({
          categoryId: data.categoryId,
          name: data.name,
          description: data.description,
          imageUrl: data.imageUrl,
          price: data.price,
          stock: data.stock,
          active: data.active
        });
      } catch (err: any){
        setError(err.message || "Ocurrio un error al obtener el producto");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct();

  }, [productId])

  const handleChange = (name: keyof UpdateProduct, value: string | number | boolean | null | File) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('formData al submit:', formData); // ← Agrega esto
    console.log('categoryId:', formData.categoryId); // ← Y esto

    if (!productId) return;

    if (!formData.categoryId) {
      setError("Categoría inválida");
      return;
    }

    setIsUpdating(true);
    setError(null);
    setIsSuccess(false);

    try{

      const dataToSend = new FormData();

      dataToSend.append('Name', formData.name);
      dataToSend.append('Description', formData.description);
      dataToSend.append('CategoryId', String(formData.categoryId));
      dataToSend.append('Price', String(formData.price));
      dataToSend.append('Stock', String(formData.stock));
      dataToSend.append('Active', formData.active ? "true" : "false");

      if(formData.imageFile){
        dataToSend.append('ImageFile' ,formData.imageFile)
      }

      await productsApi.updateProduct(productId, dataToSend as any);

      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false)
      }, 2000);

      return true;
    } catch (err: any) {
      setError(err.message || "Error al actualizar la categoria");

      setTimeout(() => {
        setError(null);
      }, 2000);

      throw err;
    } finally {
      setIsUpdating(false);
    }
  }

  return {
    product,
    formData,
    isLoading,
    isUpdating,
    isSuccess,
    error,
    handleChange,
    handleSubmit
  }

}