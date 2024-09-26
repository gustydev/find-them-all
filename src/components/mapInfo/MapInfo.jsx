import { useEffect, useState } from "react"
import { useOutletContext, useParams } from "react-router-dom";
import { apiRequest } from "../../utils/api";
import styles from './mapInfo.module.css'
import Leaderboard from "./Leaderboard";
import MapDetails from "./MapDetails";

export default function MapInfo() {
    const [mapData, setMapData] = useState({});
    const { mapId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});
    const [startGame] = useOutletContext();

    useEffect(() => {
        let ignore = false;
        async function fetchMapData() {
            try {
                const map = await apiRequest(`${import.meta.env.VITE_API_URL}/api/map/${mapId}?leaderboard=true`);
                setMapData(map);
            } catch (error) {
                setError(error)
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        if (!ignore) fetchMapData();

        return () => { ignore = true }
    }, [mapId])

    if (loading) return <div style={{textAlign: 'center'}}>Loading map data...</div>

    if (error.msg) return (
        <div>
            Error: {error.msg} (status: {error.statusCode})
        </div>
    )

    return (
        <div className={styles.mapInfo}>
            <MapDetails map={mapData} />
            <button onClick={() => {startGame(mapData._id)}}>Play now</button>
            <Leaderboard data={mapData.leaderboard} />
        </div>
    )
}