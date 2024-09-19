export default function Marker ( {coords} ) {
    const style = {
        width: '75px',
        height: '75px',
        border: '5px solid red',
        borderRadius: '50%',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        left: coords.x,
        top: coords.y
    }

    return (
        <div style={style}></div>
    )
}