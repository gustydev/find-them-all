export default function SubmitScore ({display}) {
    return (
        <div>
            <h1>Congrats!</h1>
            <p>Your time: {display}</p>
            <form action="">
                <input type="text" name='name' placeholder="Your name (optional)" minLength='2' maxLength='30'/>
                <input type="submit" value="Submit score" />
            </form>
        </div>
    )
}