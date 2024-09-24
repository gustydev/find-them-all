import styles from './info.module.css'

export default function Characters ( {gameData, mapData, inGame, style } ) {
  const chars = inGame ? gameData.characters : mapData.characters

    return (
        <div className={styles.characters} style={style}>
        {chars && chars.map((c) => {
          return (
            <div key={c.character._id} className={styles.character}>
              <img
                className={styles.charImg} 
                src={`${import.meta.env.VITE_API_URL}/images/characters/${c.character._id}.jpeg`} 
                alt={c.name}
              />
              <h3 className={styles.charName}>{c.character.name}</h3>
              {inGame && <div style={{color: c.found ? 'green' : 'red'}}>{c.found ? 'FOUND' : 'NOT FOUND'}</div>}
            </div>
          )
        })}
        </div>
    )
}