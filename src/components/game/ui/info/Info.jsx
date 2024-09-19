import Characters from "./Characters"
import styles from './info.module.css'
import Stopwatch from "./Stopwatch"

export default function Info ( {gameData, mapData, finished} ) {
    return (
        <div className={styles.info}>
            <Characters chars={gameData.characters} />
            <div className={styles.otherInfo}>
                <p>Map:</p>
                <h2 style={{fontWeight: 'bold'}}>{mapData.name}</h2>
                <Stopwatch finished={finished} />
            </div>
      </div>
    )
}