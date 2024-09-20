import { useState } from "react"
import Characters from "./Characters"
import styles from './info.module.css'
import Stopwatch from "./Stopwatch"
import SubmitScore from "./SubmitScore"

function getDisplay(time) {
    function clockFormat(number) {
        return number.toString().padStart(2, "0")
    }

    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100)
    const milliseconds = time % 100;

    return `${hours}:${clockFormat(minutes)}:${clockFormat(seconds)}.${clockFormat(milliseconds)}`
}

export default function Info ( {gameData, mapData, finished} ) {
    const [time, setTime] = useState(0);

    return (
        <div className={styles.info}>
            <div className={styles.otherInfo}>
                <p>Map:</p>
                <h2 style={{fontWeight: 'bold'}}>{mapData.name}</h2>
                {!finished && <Stopwatch finished={finished} time={time} setTime={setTime} display={getDisplay(time)}/>}
            </div>
            <Characters chars={gameData.characters} />
            {finished && <SubmitScore display={getDisplay(time)} />}
      </div>
    )
}