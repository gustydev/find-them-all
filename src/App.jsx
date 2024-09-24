import './App.css'
import { Outlet, useNavigate } from 'react-router-dom';
import { apiRequest } from './utils/api';

function App() {
  const navigate = useNavigate();
  
  async function startGame(id) {
    try {
        const game = await apiRequest(`${import.meta.env.VITE_API_URL}/api/game/new/${id}`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            }
        })
        navigate(`/game/${game._id}`)
    } catch (error) {
        console.error(error);
    }
  }

  return (
    <>
    <h1>Where&apos;s Waldo?</h1>
    <Outlet context={[startGame]}/>
    </>
  )
}

export default App
