import { useEffect, useState } from "react";
import Map from './ui/map/Map';
import Menu from "./ui/menu/Menu";
import Info from "./ui/info/Info";
import {apiRequest} from '../../utils/api';
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useMapData } from "../../hooks/useMapData";
import { useGameData } from "../../hooks/useGameData";
import 'react-toastify/dist/ReactToastify.css';
import Marker from "./ui/map/Marker";

export default function Game() {
  const { gameId } = useParams();
  const [searchParams] = useSearchParams();

  const mapId = searchParams.get('map')

  const { gameData, setGameData, loading: gameLoading, error: gameError } = useGameData(gameId)
  const { mapData, loading: mapLoading, error: mapError } = useMapData(mapId)

  const [menuActive, setMenuActive] = useState(false);
  const [menuCoords, setMenuCoords] = useState({x: 0, y: 0});
  const [guessCoords, setGuessCoords] = useState({x: 0, y: 0})
  const [finished, setFinished] = useState(false)

  const navigate = useNavigate();

  const loading = gameLoading || mapLoading;
  const error = gameError || mapError;
  
  useEffect(() => {
    async function startGame() {
      if (gameData && !gameData.started) {
        try {
          const start = await apiRequest(`${import.meta.env.VITE_API_URL}/api/game/${gameId}/start`);
          toast.info(start.msg)
        } catch (err) {
          console.error(err)
        }
      }
    }

    startGame();

  }, [gameId, gameData])

  function handleClick(e) {
    const coords = {x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY}
    if (!gameData.finished) {
      setMenuCoords(coords)
      setGuessCoords(coords)
      setMenuActive(!menuActive)
    }
  }

  async function makeGuess(charId) {
    try {
        const guess = await apiRequest(`${import.meta.env.VITE_API_URL}/api/game/${gameData._id}/guess`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                coordinates: guessCoords,
                option: charId
            })
        });

        if (guess.found) {
          toast.success(guess.msg)
          setGameData(guess.game) 
          if (guess.game.finished) { 
            setFinished(true)
          }
        } else {
          toast.error(guess.msg)
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
    if (!loading && !error.msg) {
      window.onbeforeunload = () => true;
    }
    
    return () => {
      window.onbeforeunload = null;
    };
  }, [loading, error]);

  if (error.msg) return (
    <div style={{textAlign: 'center'}}>
      Error: {error.msg} {error.statusCode && `(status: ${error.statusCode})`}
    </div>
  )

  if (loading) return <div style={{textAlign: 'center'}}>Loading game...</div>

  return (
    <div style={{display: 'grid', gridTemplateColumns: '1fr 3fr'}}>
      <Info gameData={gameData} mapData={mapData} finished={finished} submitScore={submitScore}/>
      <div style={{position: 'relative'}}>
        <Map mapData={mapData} handleClick={handleClick} style={{width: '1280px', cursor: 'crosshair'}}/>
        <Menu guessFunc={makeGuess} active={menuActive} setActive={setMenuActive} coords={menuCoords} data={gameData} />
        {gameData.characters.map((c) => {
          if (c.found) {
            const char = mapData.characters.find((ch) => ch.character._id === c.character._id)
            return <Marker key={c.character._id} coords={char.coordinates} />
          }
        })}
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
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