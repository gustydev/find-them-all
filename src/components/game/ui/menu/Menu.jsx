import Dropdown from "./Dropdown";
import Target from "./Target";
import styles from './menu.module.css'

export default function Menu( {active, coords, guessFunc, data }) {
    const position = {
        left: coords.x,
        top: coords.y,
    }

    return (
        <div className={styles.menu + ' ' + (active ? styles.active : styles.inactive)} style={position}>
            <Target style={styles.target}/>
            <Dropdown style={styles.dropdown} data={data} guessFunc={guessFunc} />
        </div>
    )
}