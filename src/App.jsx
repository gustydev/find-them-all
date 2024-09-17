import './App.css'
import { useState, useEffect } from 'react';
import Menu from './components/game/menu/Menu';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <Outlet/>
  )
}

export default App
