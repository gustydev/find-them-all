export default function Map ({ mapData, handleClick, style }) {
    return (
      <img
        src={mapData.imageUrl}
        alt={`${mapData.name} map`}
        onClick={handleClick}
        style={style}
      />
    );
  };