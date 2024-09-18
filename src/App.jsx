import './App.css'
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
    <h1>Where&apos;s Waldo?</h1>
    <Outlet/>
    </>
  )
}

export default App
