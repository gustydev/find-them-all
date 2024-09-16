import './App.css'
import { useState, useEffect } from 'react';
import Menu from './components/Menu';

function App() {
  const [menuActive, setMenuActive] = useState(false);
  const [coords, setCoords] = useState({x: 0, y: 0});
  
  function handleClick(e) {
    setCoords({x: e.pageX, y: e.pageY})
    // note: coordinates sent to back-end are offset X and Y, NOT page!!
    setMenuActive(!menuActive)
  }

  useEffect(() => {
    const handleResize = () => {
      setMenuActive(false);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
    <div className="topBar">
      <h1>Where&apos;s Waldo</h1>
    </div>
    <div className='mapContainer'>
      <img src="/images/waldo-map.jpeg" alt="waldo map" className='map' onClick={handleClick} />
      <Menu active={menuActive} coords={coords}></Menu>
    </div>
    </>
  )
}

export default App
