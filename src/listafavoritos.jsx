import { useContext } from "react";
import { FavoritosContext } from "./ProviderContext.jsx";
import { useNavigate } from "react-router-dom";

export default function ListaFavoritos() {
  
  const { favoritos, quitarFavorito } = useContext(FavoritosContext);
  const navigate = useNavigate();

  if (favoritos.length === 0) {
    return (
      <div className="lista-favoritos">
        <h3>Mis Paraderos Favoritos</h3>
        <p className="no-favoritos">Agrega paraderos a tus favoritos para verlos aquí</p>
      </div>
    );
  }

  return (
    <div className="lista-favoritos">
      <h3>Mis Paraderos Favoritos</h3>

      <ul>
        {favoritos.map(id => (
          <li key={id}>
            <button onClick={() => navigate(`/${id}`)}>{id}</button>
            <span
              className="remove-fav"
              onClick={(e) => {
                e.stopPropagation();
                quitarFavorito(id);
              }}
              title="Eliminar de favoritos"
            >
              ×
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
