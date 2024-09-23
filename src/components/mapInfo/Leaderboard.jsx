import { formatTimeDisplay } from "../../utils/formatTimeDisplay"

export default function Leaderboard( {data} ) {
    const scores = data.sort((a, b) => a.time - b.time)

    return (
        <>
        <h2>Leaderboard</h2>
        {scores.map((score) => {
            return <div key={score._id}>
                {score.name}: {formatTimeDisplay(score.time)} |&nbsp;
                {new Date(score.date).toLocaleString()}
            </div>
        })}
        </>
    )
}