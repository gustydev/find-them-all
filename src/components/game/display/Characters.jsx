import styles from '../game.module.css'

export default function Characters ( {chars, apiUrl} ) {
    return (
        <div className={styles.characters}>
          <h2>Characters</h2>
        {chars && chars.map((c) => {
          return (
            <div key={c.character} className={styles.character}>
              <img
                className={styles.charImg} 
                src={`${apiUrl}/images/characters/${c.character}.jpeg`} 
                alt={c.name}
              />
              <h3 className={styles.charName}>{c.name}</h3>
              <div style={{color: c.found ? 'green' : 'red'}}>{c.found ? 'FOUND' : 'NOT FOUND'}</div>
            </div>
          )
        })}
        </div>
    )
}