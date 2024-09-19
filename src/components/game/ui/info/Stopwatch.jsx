import { useEffect } from "react";
import { useState } from "react";

export default function Stopwatch( {finished} ) {
    const [time, setTime] = useState(0);
    
    useEffect(() => {
        let interval;

        if (!finished) {
            interval = setInterval(() => setTime(time + 1), 10);
        }

        return () => {
            clearInterval(interval);
        }
    }, [finished, time])

    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100)
    const milliseconds = time % 100;

    return (
        <div className='stopwatch'>
            {hours}:{minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}.
            {milliseconds.toString().padStart(2, "0")}
        </div>
    )
}