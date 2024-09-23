import { useState } from "react"

export default function SubmitScore ({display, submit, time}) {
    const [name, setName] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        submit({name: name, time: time})
    }

    return (
        <div>
            <h1>Congrats!</h1>
            <p>Your time: {display}</p>
            <form action="" onSubmit={handleSubmit}>
                <input onChange={(e) => {setName(e.target.value)}} type="text" name='name' placeholder="Your name (optional)" minLength='2' maxLength='30'/>
                <input type="submit" value="Submit score" />
            </form>
        </div>
    )
}