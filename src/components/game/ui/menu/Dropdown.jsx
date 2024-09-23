import { useState } from "react";

export default function Dropdown({ style, data, guessFunc }) {
    const [selection, setSelection] = useState('');

    function handleChange (e) {
        const option = e.target.value;

        if (option) {
            guessFunc(option);
            setSelection('')
        }
    }

    return (
        <select className={style} onChange={handleChange} value={selection} >
            <option value="" disabled>Select a character</option>
            {data.characters && data.characters.map((c) => {
                if (!c.found) {
                    return <option key={c.character._id} value={c.character._id}>{c.character.name}</option>
                }
            })}
        </select>
    )
}