import { useEffect, useState } from "react";
import Map from './ui/map/Map';
import Menu from "./ui/menu/Menu";
import Info from "./ui/info/Info";
import styles from './game.module.css';
import {apiRequest} from '../../utils/api';
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Game() {
  const [menuActive, setMenuActive] = useState(false);
  const [menuCoords, setMenuCoords] = useState({x: 0, y: 0});
  const [guessCoords, setGuessCoords] = useState({x: 0, y: 0})
  const [gameData, setGameData] = useState({});
  const [mapData, setMapData] = useState({});
  const { gameId } = useParams();
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false)
  const [expired, setExpired] = useState(false);
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

        if (guess.msg) { toast(guess.msg) }
        if (guess.game) { // request only returns "game" if guess is correct
          setGameData(guess.game) 
          if (guess.game.finished) { 
            setFinished(true) 
            toast.success('All characters found!')
          }
        }
        setMenuActive(false)
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      setLoading(true);
      try {
        const data = await apiRequest(`${import.meta.env.VITE_API_URL}/api/game/${gameId}`);
        if (data.started) { 
          setExpired(true);
        }

        const start = await apiRequest(`${import.meta.env.VITE_API_URL}/api/game/${gameId}/start`);
        toast.info(start.msg)
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

  useEffect(() => {
    if (!loading && !expired) {
      window.onbeforeunload = () => true;
    }
    
    return () => {
      window.onbeforeunload = null;
    };
  }, [loading, expired]);

  if (expired) return 'Game session expired! Please start a new game.'
  if (loading) return 'Loading'
  
  return (
    <div className={styles.game}>
      <div className={styles.mapContainer}>
        <Map gameData={gameData} mapData={mapData} handleClick={handleClick} />
        <Menu guessFunc={makeGuess} active={menuActive} setActive={setMenuActive} coords={menuCoords} data={gameData} />
      </div>
      <Info gameData={gameData} mapData={mapData} finished={finished} />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}