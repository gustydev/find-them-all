export function formatTimeDisplay(time) {
    function clockFormat(number) {
        return number.toString().padStart(2, "0")
    }

    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100)
    const milliseconds = time % 100;

    return `${hours}:${clockFormat(minutes)}:${clockFormat(seconds)}.${clockFormat(milliseconds)}`
}