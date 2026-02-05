import { createContext, useState } from "react";

export const FavoritosContext = createContext();

export function FavoritosProvider({ children }) {

  const [favoritos, setFavoritos] = useState(() => {
    const keys = Object.keys(localStorage);
    const favIds = keys.filter(key => localStorage.getItem(key) === "true");
    console.log(favIds);
    return favIds;
  });

  const agregarFavorito = (id) => {
    localStorage.setItem(id, "true");
    setFavoritos(prev => [...prev, id]);
  };

  const quitarFavorito = (id) => {
    localStorage.removeItem(id);
    setFavoritos(prev => prev.filter(f => f !== id));
  };

  const setFavorito = (id) => {
    if (favoritos.includes(id)) {
      quitarFavorito(id);
    } else {
      agregarFavorito(id);
    }
  };

  return (
    <FavoritosContext.Provider value={{
      favoritos,
      setFavoritos,
      agregarFavorito,
      quitarFavorito,
      setFavorito
    }}>
      {children}
    </FavoritosContext.Provider>
  );
}
