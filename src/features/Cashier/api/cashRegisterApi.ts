import http from "../../../api/apiClient";

export interface OrderSummary {
  orderId: number;
  clientName: string;
  total: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
  itemCount: number;
}

export interface CashRegisterSession {
  sessionId: number;
  openingAmount: number;
  closingAmount: number;
  totalCalculated: number;
  openedAt: string;
  closedAt?: string | null;
  cashierName: string;
  orders: OrderSummary[];
}

export const cashRegisterApi = {
  getActive: async (): Promise<CashRegisterSession> => {
    const { data } = await http.get<CashRegisterSession>("/sessions/active");
    return data;
  },
  open: async (userId: number, openingAmount: number): Promise<void> => {
    await http.post("/sessions/open", { userId, openingAmount });
  },
  close: async (): Promise<void> => {
    await http.put("/sessions/close");
  },
};