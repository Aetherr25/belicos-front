import { useCallback, useEffect, useState } from "react";
import { reportsApi } from "../api/reportsApi";
import type { SalesReport } from "../api/reportsApi";

export const useGetSalesReport = (period: string) => {
    const [report, setReport] = useState<SalesReport | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchReport = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await reportsApi.getSalesReport(period);
            setReport(data);
        } catch {
            setError("Error al cargar el reporte.");
        } finally {
            setIsLoading(false);
        }
    }, [period]);

    useEffect(() => { fetchReport(); }, [fetchReport]);

    return { report, isLoading, error, refetch: fetchReport };
};