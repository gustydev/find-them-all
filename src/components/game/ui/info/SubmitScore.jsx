import { useState } from "react"

const styles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
}

export default function SubmitScore ({display, submit, time}) {
    const [name, setName] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        submit({name: name, time: time})
    }

    return (
        <div style={styles}>
            <h1>Congrats!</h1>
            <p>Your time: {display}</p>
            <form action="" onSubmit={handleSubmit} style={styles}>
                <input onChange={(e) => {setName(e.target.value)}} type="text" name='name' placeholder="Your name (optional)" minLength='2' maxLength='30'/>
                <input type="submit" value="Submit score" />
            </form>
        </div>
    )
}