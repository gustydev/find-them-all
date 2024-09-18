import Characters from "./Characters"
import styles from './info.module.css'

export default function Info ( {gameData, mapData} ) {
    return (
        <div className={styles.info}>
            <Characters chars={gameData.characters} />
            <div className={styles.otherInfo}>
                <p>Map:</p>
                <h2 style={{fontWeight: 'bold'}}>{mapData.name}</h2>
                <p>0:00.00</p>
                {/* replace above with actual timer later */}
            </div>
      </div>
    )
}