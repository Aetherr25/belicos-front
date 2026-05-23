import http from "../../../api/apiClient";

export interface ActiveSession {
    sessionId: number;
    cashierName: string;
    openingAmount: number;
    openedAt: string;
    totalCalculated: number;
    totalOrders: number;
    active: boolean;
}

export const sessionsApi = {
    getActive: async (): Promise<ActiveSession> => {
        const { data } = await http.get("/sessions/active");
        return data;
    },
};