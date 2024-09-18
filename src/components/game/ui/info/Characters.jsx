import styles from './info.module.css'

export default function Characters ( {chars } ) {
    return (
        <div className={styles.characters}>
          <h2>Characters</h2>
        {chars && chars.map((c) => {
          return (
            <div key={c.character} className={styles.character}>
              <img
                className={styles.charImg} 
                src={`${import.meta.env.VITE_API_URL}/images/characters/${c.character}.jpeg`} 
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