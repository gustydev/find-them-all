import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import Game from './components/game/Game.jsx';
import ErrorPage from './components/error/ErrorPage.jsx'
import './index.css'
import Index from './components/index/Index.jsx';
import MapInfo from './components/mapInfo/MapInfo.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage/>,
    children: [
      { path: '/', element: <Index />},
      { path: 'map/:mapId', element: <MapInfo /> },
      { path: 'game/:gameId', element: <Game/> }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)