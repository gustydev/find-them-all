import Characters from "./Characters"
import styles from '../game.module.css'
export default function Info ( {apiUrl, gameData, mapData} ) {
    return (
        <div className={styles.info}>
            <Characters chars={gameData.characters} apiUrl={apiUrl} />
            <div className={styles.otherInfo}>
                <p>Map:</p>
                <h2 style={{fontWeight: 'bold'}}>{mapData.name}</h2>
                <p>0:00.00</p>
                {/* replace above with actual timer later */}
            </div>
      </div>
    )
}