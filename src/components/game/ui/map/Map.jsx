export default function Map ({ mapData, handleClick, style }) {
    return (
      <img
        src={`${import.meta.env.VITE_API_URL}/images/maps/${mapData._id}.jpeg`}
        alt={`${mapData.name} map`}
        onClick={handleClick}
        style={style}
      />
    );
  };