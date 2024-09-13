export default function Dropdown( { active, coords }) {
    const position = {
        left: coords.x,
        top: coords.y
    }
    
    return (
        <div className={'dropdown ' + (active ? 'active' : 'inactive')} style={position}>
            <ul>
                <li>
                    <button>option 1</button>
                    <button>option 2</button>
                    <button>option 3</button>
                </li>
            </ul>
        </div>
    )
}