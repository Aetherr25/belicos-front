// order.types.ts — archivo completo corregido

export interface OrderPreviewItemDto {
  productId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  sauceId?: number;
  sauceMode?: string;
}

export interface OrderPreviewDto {
  items: OrderPreviewItemDto[];
  subtotal: number;
  deliveryCost: number;
  total: number;
  isDelivery: boolean;
}

export interface CreateOrderItemDto {   // ← debe ir ANTES de CreateOrderDto
  productId: number;
  quantity: number;
  sauceId?: number;
}

export interface CreateOrderDto {
  clientName: string;
  paymentMethod: string;
  isDelivery: boolean;
  items: CreateOrderItemDto[];          // ← ahora TypeScript ya la conoce
}

export interface OrderItem {
  productId: number;
  productName?: string;
  quantity: number;
  unitPrice?: number;
  subtotal?: number;
}

export interface Order {
  orderId: number;
  clientName?: string;
  status?: string;
  paymentMethod?: string;
  isDelivery?: boolean;
  total: number;
  createdAt: string;
  items: OrderItem[];
}