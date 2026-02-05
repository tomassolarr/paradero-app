import { useContext } from "react";
import { FavoritosContext } from "./ProviderContext.jsx";

export default function ParaderoFavorito({ paraderoId }) {

  const { favoritos, setFavorito } = useContext(FavoritosContext);

  const esFavorito = favoritos.includes(paraderoId);

  const handleClick = () => {
    setFavorito(paraderoId);
  };

  return (
    <button 
      className={`btn-favorito ${esFavorito ? 'activo' : 'no-activo'}`}
      onClick={handleClick}
      title={esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      {esFavorito ? "★" : "☆"}
    </button>
  );
}
