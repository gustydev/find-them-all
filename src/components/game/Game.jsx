import { useEffect, useState } from "react";
import Map from './ui/map/Map';
import Menu from "./ui/menu/Menu";
import Info from "./ui/info/Info";
import styles from './game.module.css';
import {apiRequest} from '../../utils/api';
import { useParams } from "react-router-dom";

export default function Game() {
  const [menuActive, setMenuActive] = useState(false);
  const [menuCoords, setMenuCoords] = useState({x: 0, y: 0});
  const [guessCoords, setGuessCoords] = useState({x: 0, y: 0})
  const [gameData, setGameData] = useState({});
  const [mapData, setMapData] = useState({});
  const { gameId } = useParams();
  const [loading, setLoading] = useState(true);
  console.log(gameData, mapData)
  
  function handleClick(e) {
    if (!gameData.finished) {
      setMenuCoords({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY})
      setGuessCoords({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY})
      setMenuActive(!menuActive)
    }
    console.log({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY})
  }

  async function makeGuess(charId) {
    try {
        const guess = await apiRequest(`${import.meta.env.VITE_API_URL}/api/game/${gameData._id}`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                coordinates: guessCoords,
                option: charId
            })
        });
        if (guess.msg) { alert(guess.msg) } // should display the messages somewhere else other than alerts
        if (guess.game) { setGameData(guess.game) } // request only returns "game" if guess is correct

        setMenuActive(false)
        
    } catch (error) {
        console.error(error);
    }
}

  useEffect(() => { // This is to get rid of the menu when resizing window
    const handleResize = () => {
      setMenuActive(false);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      setLoading(true);
      try {
        const data = await apiRequest(`${import.meta.env.VITE_API_URL}/api/game/${gameId}`);
        setGameData(data)

        const map = await apiRequest(`${import.meta.env.VITE_API_URL}/api/map/${data.map}`);
        setMapData(map);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (!ignore) fetchData();

    return () => {
      ignore = true;
    }
  }, [gameId])

  if (loading) return 'Loading'
  
  return (
    <div className={styles.game}>
      <div className={styles.mapContainer}>
        <Map gameData={gameData} mapData={mapData} handleClick={handleClick} />
        <Menu guessFunc={makeGuess} active={menuActive} setActive={setMenuActive} menuCoords={menuCoords} data={gameData} />
      </div>
      <Info gameData={gameData} mapData={mapData} />
    </div>
  )
}