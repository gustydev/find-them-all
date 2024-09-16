import Dropdown from "./menu/Dropdown";
import Target from "./menu/Target";

export default function Menu( {active, coords}) {
    const position = {
        left: coords.x - 55,
        top: coords.y - 55
    }

    return (
        <div className={'menu ' + (active ? 'active' : 'inactive')} style={position}>
            <Target active={active} coords={coords} />
            <Dropdown active={active} coords={coords} />
        </div>
    )
}