import { useEffect, useState } from "react";
import Map from './ui/map/Map';
import Menu from "./ui/menu/Menu";
import Info from "./ui/info/Info";
import styles from './game.module.css';
import {apiRequest} from '../../utils/api';
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Marker from "./ui/map/Marker";

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
  const navigate = useNavigate();
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

  async function submitScore(formData) {
    try {
      await apiRequest(`${import.meta.env.VITE_API_URL}/api/map/${mapData._id}/score`, {
        method: 'post',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      navigate(`/map/${mapData._id}`);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      setLoading(true);
      try {
        const data = await apiRequest(`${import.meta.env.VITE_API_URL}/api/game/${gameId}`);
        if (data.started) { 
          // setExpired(true);
          // uncommented to keep testing
        }

        // const start = await apiRequest(`${import.meta.env.VITE_API_URL}/api/game/${gameId}/start`);
        // toast.info(start.msg)
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
  if (loading) return 'Loading your game...'
  
  return (
    <div className={styles.game}>
      <div className={styles.mapContainer}>
        <Map mapData={mapData} handleClick={handleClick} style={{width: '1280px', cursor: 'crosshair'}}/>
        <Menu guessFunc={makeGuess} active={menuActive} setActive={setMenuActive} coords={menuCoords} data={gameData} />
        {gameData.characters.map((c) => {
          if (c.found) {
            const char = mapData.characters.find((ch) => ch.character._id === c.character._id)
            return <Marker key={c.character._id} coords={char.coordinates} />
          }
        })}
      </div>
      <Info gameData={gameData} mapData={mapData} finished={finished} submitScore={submitScore}/>
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