import { useEffect, useState } from "react";
import Menu from "./menu/Menu";
import styles from './game.module.css';
import {apiRequest, API_URL} from '../../utils/api';
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
      setMenuCoords({x: e.pageX, y: e.pageY})
      setGuessCoords({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY})
      setMenuActive(!menuActive)
    }
    console.log({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY})
  }

  async function makeGuess(charId) {
    try {
        const guess = await apiRequest(`${API_URL}/api/game/${gameData._id}`, {
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
        const data = await apiRequest(`${API_URL}/api/game/${gameId}`);
        setGameData(data)

        const map = await apiRequest(`${API_URL}/api/map/${data.map}`);
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
    <>
    <div className={styles.mapContainer}>
      <img src={`${API_URL}/images/maps/${gameData.map}.jpeg`} alt={mapData.name + ' map'} className={styles.map} onClick={handleClick} />
      <Menu guessFunc={makeGuess} active={menuActive} setActive={setMenuActive} menuCoords={menuCoords} guessCoords={guessCoords} data={gameData} />
    </div>
    <div className={styles.characters}>
      {gameData && gameData.characters.map((c) => {
        return (
          <div key={c.character}>
            <img
              className={styles.charImg} 
              src={`${API_URL}/images/characters/${c.character}.jpeg`} 
              alt={c.name}
              style={{borderBottom: c.found ? '5px solid green' : '5px solid red'}}
            />
            <div style={{color: c.found ? 'green' : 'red'}}>{c.found ? 'FOUND' : 'NOT FOUND'}</div>
          </div>
      )
      })}
    </div>
    </>
  )
}