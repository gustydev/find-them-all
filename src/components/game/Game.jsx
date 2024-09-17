import { useEffect, useState } from "react";
import Menu from "./menu/Menu";
import styles from './game.module.css';

export default function Game() {
  const [menuActive, setMenuActive] = useState(false);
  const [coords, setCoords] = useState({x: 0, y: 0});
  
  function handleClick(e) {
    setCoords({x: e.pageX, y: e.pageY})
    console.log({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY})
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
    <div className={styles.mapContainer}>
      <img src="/images/waldo-map.jpeg" alt="waldo map" className={styles.map} onClick={handleClick} />
      <Menu active={menuActive} coords={coords}></Menu>
    </div>
  )
}