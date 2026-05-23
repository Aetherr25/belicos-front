import { useEffect, useState } from "react";
import { sessionsApi } from "../api/sessionsApi";
import type { ActiveSession } from "../api/sessionsApi";

export const useGetActiveSession = () => {
    const [session, setSession] = useState<ActiveSession | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            try {
                const data = await sessionsApi.getActive();
                setSession(data);
            } catch {
                setError("No hay sesión activa.");
            } finally {
                setIsLoading(false);
            }
        };
        fetch();
    }, []);

    return { session, isLoading, error };
};