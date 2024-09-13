import './App.css'
import { useState } from 'react';
import Dropdown from './components/Dropdown';

function App() {
  const [menuActive, setMenuActive] = useState(false);
  const [coords, setCoords] = useState({x: 0, y: 0});

  return (
    <>
    <div className="topBar">
      <h1>Where&apos;s Waldo</h1>
    </div>
    <div className='mapContainer'>
      <img src="/images/waldo-map.jpeg" alt="waldo map" className='map' onClick={(e) => {
      setCoords({x: e.clientX, y: e.clientY})
      setMenuActive(!menuActive) }
      }/>
      <Dropdown active={menuActive} coords={coords}></Dropdown>
    </div>
    
    </>
  )
}

export default App
