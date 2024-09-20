export default function MapCard( { map, startGame } ) {
    const styles = {
        border: '1px solid black',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '4px'
    }

    return (
        <div style={styles}>
            <img 
            src={`${import.meta.env.VITE_API_URL}/images/maps/${map._id}.jpeg`}
            alt={`${map.name} map`}
            style={{width: '300px', height: 'auto'}}
            />
            <div>
                {map.name}
            </div>
            <div>
                {map.characters.length} characters
            </div>
            <button onClick={() => {startGame(map._id)}}>Play</button>
            <button>View info (leaderboards and more)</button>
        </div>
    )
}