export interface OrderItem {
    orderItemId: number;
    productId: number;
    productName?: string | null;
    quantity: number;
    unitPrice: number;
    sauceId?: number | null;
    sauceMode?: string | null;
}

export interface Order {
    orderId: number;
    clientName: string;
    clientPhone?: string | null;
    notes?: string | null;
    isDelivery: boolean;
    deliveryCost?: number | null;
    address?: string | null;
    subtotal: number;
    total: number;
    paymentMethod: string;
    status: string;
    createdAt: string;
    items: OrderItem[];
}