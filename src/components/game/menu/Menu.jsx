import Dropdown from "./Dropdown";
import Target from "./Target";
import styles from '../game.module.css'

export default function Menu( {active, menuCoords, guessFunc, guessCoords, data }) {
    const position = {
        left: menuCoords.x - 50,
        top: menuCoords.y - 50
    }

    return (
        <div className={styles.menu + ' ' + (active ? styles.active : styles.inactive)} style={position}>
            <Target style={styles.target}/>
            <Dropdown style={styles.dropdown} options={data.characters} guessFunc={guessFunc} />
        </div>
    )
}