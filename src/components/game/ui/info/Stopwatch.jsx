import { useEffect } from "react";

export default function Stopwatch( {finished, setTime, display} ) {
    useEffect(() => {
        if (!finished) {
            const interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 10);
    
            return () => clearInterval(interval);
        }
    }, [finished, setTime]);

    return (
        <div className='stopwatch'>
            {display}
        </div>
    )
}