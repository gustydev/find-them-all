import Dropdown from "./Dropdown";
import Target from "./Target";
import styles from '../game.module.css'

export default function Menu( {active, coords}) {
    const position = {
        left: coords.x - 55,
        top: coords.y - 65
    }

    return (
        <div className={styles.menu + ' ' + (active ? styles.active : styles.inactive)} style={position}>
            <Target style={styles.target} active={active} coords={coords} />
            <Dropdown style={styles.dropdown} active={active} coords={coords} />
        </div>
    )
}