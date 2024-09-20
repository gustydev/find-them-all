export default function MapInfo( { map, startGame } ) {
    return (
        <div>
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