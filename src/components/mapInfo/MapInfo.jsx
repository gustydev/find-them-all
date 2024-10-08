import { useOutletContext, useParams } from "react-router-dom";
import styles from './mapInfo.module.css'
import Leaderboard from "./Leaderboard";
import MapDetails from "./MapDetails";
import { useMapData } from "../../hooks/useMapData";
import ErrorMessage from "../error/ErrorMessage";

export default function MapInfo() {
    const { mapId } = useParams();
    const { mapData, loading, error } = useMapData(mapId, true)
    const [startGame] = useOutletContext();

    if (loading) return <div style={{textAlign: 'center'}}>Loading map data...</div>

    if (error.msg) return (
        <ErrorMessage error={error}/>
      )

    return (
        <div className={styles.mapInfo}>
            <MapDetails map={mapData} />
            <button onClick={() => {startGame(mapData._id)}}>Play now</button>
            <Leaderboard data={mapData.leaderboard} />
        </div>
    )
}