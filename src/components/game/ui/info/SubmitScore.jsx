import { useState } from "react"
import styles from './info.module.css'

export default function SubmitScore ({display, submit, time}) {
    const [name, setName] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        submit({name: name, time: time, password: import.meta.env.VITE_SECRET_PASS})
    }

    return (
        <div className={styles.submit}>
            <h1>Congrats!</h1>
            <p>Your time: {display}</p>
            <form action="" onSubmit={handleSubmit} className={styles.submit}>
                <input onChange={(e) => {setName(e.target.value)}} type="text" name='name' placeholder="Your name (optional)" minLength='2' maxLength='30'/>
                <input type="submit" value="Submit score" />
            </form>
        </div>
    )
}