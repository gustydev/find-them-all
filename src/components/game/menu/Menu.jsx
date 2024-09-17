import Dropdown from "./Dropdown";
import Target from "./Target";
import styles from '../game.module.css'
import { useEffect } from "react";
import { API_URL, apiRequest } from "../../../utils/api";

export default function Menu( {active, menuCoords, guessCoords, data }) {
    const position = {
        left: menuCoords.x - 55,
        top: menuCoords.y - 55
    }

    async function makeGuess(charId) {
        try {
            const guess = await apiRequest(`${API_URL}/api/game/${data._id}`, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    coordinates: guessCoords,
                    option: charId
                })
            });
            if (guess.msg) { alert(guess.msg) }
            
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={styles.menu + ' ' + (active ? styles.active : styles.inactive)} style={position}>
            <Target style={styles.target}/>
            <Dropdown style={styles.dropdown} options={data.characters} guessFunc={makeGuess} />
        </div>
    )
}