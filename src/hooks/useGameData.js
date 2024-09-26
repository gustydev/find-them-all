import { useEffect, useState } from "react"
import { apiRequest } from "../utils/api";

export function useGameData(gameId) {
    const [gameData, setGameData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false);

    useEffect(() => {
        let ignore = false;
    
        async function fetchGameData() {
          setLoading(true);
          try {
            const data = await apiRequest(`${import.meta.env.VITE_API_URL}/api/game/${gameId}`);
            setGameData(data) 
          } catch (error) {
            setError(error);
            console.error(error);
          } finally {
            setLoading(false)
          }
        }
    
        if (!ignore) fetchGameData();
    
        return () => {
          ignore = true;
        }
    }, [gameId])

    return { gameData, setGameData, loading, error }
}