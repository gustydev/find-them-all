import { useState } from "react"
import Characters from "./Characters"
import styles from './info.module.css'
import Stopwatch from "./Stopwatch"
import SubmitScore from "./SubmitScore"
import { formatTimeDisplay } from "../../../../utils/formatTimeDisplay"

export default function Info ( {gameData, mapData, finished, submitScore} ) {
    const [time, setTime] = useState(0);

    return (
        <div className={styles.info}>
            <div className={styles.otherInfo}>
                <p>Map:</p>
                <h2 style={{fontWeight: 'bold'}}>{mapData.name}</h2>
                {!finished && <Stopwatch finished={finished} time={time} setTime={setTime} display={formatTimeDisplay(time)}/>}
            </div>
            <Characters gameData={gameData} mapData={mapData} inGame={true} />
            {finished && <SubmitScore display={formatTimeDisplay(time)} submit={submitScore} time={time}/>}
      </div>
    )
}