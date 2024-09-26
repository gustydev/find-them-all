import { useEffect, useState } from "react"
import { apiRequest } from "../../utils/api";
import MapCard from "./MapCard";
import styles from './index.module.css'
import { useOutletContext } from "react-router-dom";

export default function Index() {
    const [maps, setMaps] = useState([]);
    const [loading, setLoading] = useState(true)
    const [startGame] = useOutletContext();

    useEffect(() => {
        let ignore = false;

        async function fetchMaps() {
            try {
                const maps = await apiRequest(`${import.meta.env.VITE_API_URL}/api/map/list`)
                setMaps(maps)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        if (!ignore) fetchMaps();

        return () => {
            ignore = true;
        }
    }, [])

    if (loading) return <div style={{textAlign: 'center'}}>Loading map data...</div>

    return (
        <div className={styles.index}>
            <div>Find the characters as fast as possible!</div>
            <div className={styles.mapList}>
                {maps.map((m) => {
                    return <MapCard key={m._id} map={m} startGame={startGame}/>
                })}
            </div>
        </div>
    )
}