import { useEffect, useState } from "react"
import { apiRequest } from "../utils/api";

export function useMapData(mapId, leaderboard = false) {
    const [mapData, setMapData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false);

    useEffect(() => {
        let ignore = false;
    
        async function fetchMapData() {
          setLoading(true);
          try {
            const data = await apiRequest(`${import.meta.env.VITE_API_URL}/api/map/${mapId}?leaderboard=${leaderboard}`);
            setMapData(data);
          } catch (error) {
            setError(error);
            console.error(error);
          } finally {
            setLoading(false)
          }
        }
    
        if (!ignore) fetchMapData();
    
        return () => {
          ignore = true;
        }
    }, [mapId, leaderboard])

    return { mapData, loading, error }
}