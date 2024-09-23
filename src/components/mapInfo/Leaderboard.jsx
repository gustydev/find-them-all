import { useState } from "react"
import { formatTimeDisplay } from "../../utils/formatTimeDisplay"

export default function Leaderboard( {data} ) {
    const [hidden, setHidden] = useState(true);
    const scores = data.sort((a, b) => a.time - b.time)

    return (
        <>
        <h2>Leaderboard</h2>
        {scores.length === 0 ? 'No scores yet.' : hidden ? <button onClick={() => {setHidden(!hidden)}}>Show scores</button> : (
            <>
            <button onClick={() => setHidden(!hidden)}>Hide scores</button>
            {scores.map((score) => {
                return <div key={score._id}>
                    {score.name}: {formatTimeDisplay(score.time)} |&nbsp;
                    {new Date(score.date).toLocaleString()}
                </div>
            })}
            </>
        )}
        </>
    )
}