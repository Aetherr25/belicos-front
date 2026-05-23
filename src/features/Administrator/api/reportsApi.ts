import http from "../../../api/apiClient";

export interface DailySales {
    day: string;
    total: number;
}

export interface CategorySales {
    categoryName: string;
    total: number;
    percentage: number;
}

export interface TopProduct {
    productName: string;
    categoryName: string;
    quantitySold: number;
    revenue: number;
}

export interface SalesReport {
    totalSales: number;
    totalOrders: number;
    averageTicket: number;
    dailySales: DailySales[];
    salesByCategory: CategorySales[];
    topProducts: TopProduct[];
}

export const reportsApi = {
    getSalesReport: async (period: string): Promise<SalesReport> => {
        const { data } = await http.get<SalesReport>(`/reports/sales?period=${period}`);
        return data;
    },
};