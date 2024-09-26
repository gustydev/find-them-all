import { Link } from "react-router-dom"
import Map from "../game/ui/map/Map";
import styles from './index.module.css';

export default function MapCard( { map, startGame } ) {
    return (
        <div className={styles.mapCard}>
            <div className={styles.info}>
                <Map mapData={map} style={{width: '300px', height: '200px'}}/>
                <div className={styles.mapName}>
                    {map.name}
                </div>
                <div>
                    {map.characters.length} characters
                </div>
            </div>
            <div className={styles.links}>
                <button onClick={() => {startGame(map._id)}}>Play</button>
                <Link to={`/map/${map._id}`}><button>View info (leaderboards and more)</button></Link>
            </div>
        </div>
    )
}