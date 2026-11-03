import { useState, useCallback } from "react";
import type { CreateOrderDto, OrderPreviewDto } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5150/api";

export const useOrderPreview = () => {
  const [preview, setPreview] = useState<OrderPreviewDto | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPreview = useCallback(async (order: CreateOrderDto) => {
    if (order.items.length === 0) {
      setPreview(null);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/orders/preview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      const data: OrderPreviewDto = await res.json();
      setPreview(data);
    } catch (e) {
      console.error("Error fetching preview", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const confirmOrder = useCallback(async (order: CreateOrderDto) => {
    const res = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    return res.ok;
  }, []);

  return { preview, loading, fetchPreview, confirmOrder };
};