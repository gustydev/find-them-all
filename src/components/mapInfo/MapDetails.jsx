import Map from "../game/ui/map/Map"
import Characters from "../game/ui/info/Characters"
import styles from './mapInfo.module.css'

export default function MapDetails( {map} ) {
    return (
        <div className={styles.mapDetails}>
            <h2><span style={{fontWeight: 'bold'}}>Map:</span> {map.name}</h2>
            <Map mapData={map} style={{width: '600px'}}/>
            <h2><span style={{fontWeight: 'bold'}}>Characters:</span></h2>
            <Characters mapData={map} style={{flexDirection: 'row'}}/>
        </div>
    )
}