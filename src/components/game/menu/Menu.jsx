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
            <Target active={active} coords={coords} />
            <Dropdown active={active} coords={coords} />
        </div>
    )
}