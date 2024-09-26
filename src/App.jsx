import './App.css'
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { apiRequest } from './utils/api';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  
  async function startGame(mapId) {
    try {
        const game = await apiRequest(`${import.meta.env.VITE_API_URL}/api/game/new/${mapId}`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            }
        })
        navigate(`/game/${game._id}?map=${mapId}`)
    } catch (error) {
        console.error(error);
    }
  }

  return (
    <>
    <header>
      <h1>Find Them All</h1>
    </header>
    <main>
      <Outlet context={[startGame]}/>
    </main>
    <footer>
      {location.pathname !== '/' && (
        <Link to='/'>
        <p style={{marginTop: '16px'}}>
          Return to home page
        </p>
      </Link>
      )}
    </footer>
    </>
  )
}

export default App
