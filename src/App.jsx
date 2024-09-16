import './App.css'
import { useState, useRef } from 'react';
import Menu from './components/Menu';

function App() {
  const [menuActive, setMenuActive] = useState(false);
  const [coords, setCoords] = useState({x: 0, y: 0});
  const imgRef = useRef();
  
  function handleClick(e) {
    setCoords({x: e.clientX, y: e.nativeEvent.pageY})
    setMenuActive(!menuActive)

  }

  return (
    <>
    <div className="topBar">
      <h1>Where&apos;s Waldo</h1>
    </div>
    <div className='mapContainer'>
      <img ref={imgRef} src="/images/waldo-map.jpeg" alt="waldo map" className='map' onClick={handleClick} />
      <Menu active={menuActive} coords={coords}></Menu>
    </div>
    </>
  )
}

export default App
