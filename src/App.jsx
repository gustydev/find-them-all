import './App.css'

function App() {

  return (
    <>
    <div className="topBar">
      <h1>Where&apos;s Waldo</h1>
    </div>
    <div className='mapContainer'>
      <img src="/images/waldo-map.jpeg" alt="waldo map" className='map' onClick={(e) => console.log(
        e.nativeEvent.offsetX, e.nativeEvent.offsetY)} />
    </div>
    </>
    
  )
}

export default App
