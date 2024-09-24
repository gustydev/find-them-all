import { useEffect, useState } from "react"
import { apiRequest } from "../../utils/api";
import MapCard from "./MapCard";
import { useNavigate } from "react-router-dom";
import styles from './index.module.css'

export default function Index() {
    const [maps, setMaps] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let ignore = false;

        async function fetchMaps() {
            try {
                const maps = await apiRequest(`${import.meta.env.VITE_API_URL}/api/map/list`)
                setMaps(maps)
            } catch (error) {
                console.error(error)
            }
        }

        if (!ignore) fetchMaps();

        return () => {
            ignore = true;
        }
    }, [])

    async function startGame(id) {
        try {
            const game = await apiRequest(`${import.meta.env.VITE_API_URL}/api/game/new/${id}`, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            navigate(`/game/${game._id}`)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={styles.main}>
            <div>Find the characters as fast as possible!</div>
            <div className={styles.mapList}>
                {maps.map((m) => {
                    return <MapCard key={m._id} map={m} startGame={startGame}/>
                })}
            </div>
        </div>
    )
}