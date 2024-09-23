import Map from "../game/ui/map/Map"
import Characters from "../game/ui/info/Characters"

export default function MapDetails( {map} ) {
    return (
        <div className='mapDetails'>
            <h2>{map.name}</h2>
            <div style={{display: 'flex'}}>
                <Map mapData={map} style={{width: '600px'}}/>
                <Characters mapData={map} />
            </div>
        </div>
    )
}