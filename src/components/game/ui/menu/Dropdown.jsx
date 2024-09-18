export default function Dropdown({ style, data, guessFunc }) {
    return (
        <ul className={style}>
            {data.characters && data.characters.map((c) => {
                if (!c.found) {
                    return <li key={c.character}><button onClick={() => {guessFunc(c.character)}}>{c.name}</button></li>
                }
            })}
        </ul>
    )
}