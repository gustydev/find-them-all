import { useState } from "react"
import { formatTimeDisplay } from "../../utils/formatTimeDisplay"
import styles from './mapInfo.module.css'

export default function Leaderboard( {data} ) {
    const [hidden, setHidden] = useState(true);
    const scores = data.sort((a, b) => a.time - b.time)

    return (
        <>
        <h2>Leaderboard</h2>
        {scores.length === 0 ? 'No scores yet.' : hidden ? <button onClick={() => {setHidden(!hidden)}}>Show scores ({scores.length})</button> : (
            <>
            <button onClick={() => setHidden(!hidden)}>Hide scores</button>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Name</th>
                        <th>Time</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((score, index) => (
                        <tr key={score._id}>
                            <td style={{fontWeight: 'bold'}}>{index + 1}</td>
                            <td>{score.name}</td>
                            <td>{formatTimeDisplay(score.time)}</td>
                            <td>{new Date(score.date).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </>
        )}
        </>
    )
}