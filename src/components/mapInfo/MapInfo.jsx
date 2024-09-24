import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { apiRequest } from "../../utils/api";
import Leaderboard from "./Leaderboard";
import MapDetails from "./MapDetails";

export default function MapInfo() {
    const [mapData, setMapData] = useState({});
    const { mapId } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let ignore = false;
        async function fetchMapData() {
            try {
                const map = await apiRequest(`${import.meta.env.VITE_API_URL}/api/map/${mapId}?leaderboard=true`);
                setMapData(map);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        if (!ignore) fetchMapData();

        return () => { ignore = true }
    }, [mapId])

    if (loading) return 'Loading map data...'
    console.log(mapData)

    return (
        <>
        <MapDetails map={mapData} />
        <Leaderboard data={mapData.leaderboard} />
        </>
    )
}