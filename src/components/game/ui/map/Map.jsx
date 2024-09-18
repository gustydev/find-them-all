export default function Map ({ gameData, mapData, handleClick }) {
    return (
      <img
        src={`${import.meta.env.VITE_API_URL}/images/maps/${gameData.map}.jpeg`}
        alt={`${mapData.name} map`}
        onClick={handleClick}
        style={{width: '1280px', cursor: 'crosshair'}}
      />
    );
  };