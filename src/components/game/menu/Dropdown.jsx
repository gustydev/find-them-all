export default function Dropdown({ style, options, guessFunc }) {
    return (
        <ul className={style}>
            {options.map((c) => {
                if (!c.found) {
                    return <li key={c.character}><button onClick={() => {guessFunc(c.character)}}>{c.name}</button></li>
                }
            })}
        </ul>
    )
}