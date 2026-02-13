import { createContext, useContext, useEffect, useMemo, useState } from "react";

const FavoriteVideogamesContext = createContext(null);

//chiave pe local storage
const STORAGE_KEY = "favoriteGameIds";

const FavoriteVideogamesProvider = ({ children }) => {

  //funzione a usestate per non rendirizzare localstorage ogni render
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    //trasformo l’array in stringa perché localStorage salva stringhe
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  //evito re-render inutili con usememo
  const value = useMemo(() => {

    //controllo se id è presente nella variabile di stato e lo trasofrmo in un numero per il confronto
    const isFavorite = (id) => favoriteIds.includes(Number(id));

    //funzione aggiungi o rimuovi preferiti, se presente lo toglie, altrimenti lo aggiugne
    const toggleFavorite = (id) => {
      const numericId = Number(id);
      setFavoriteIds((prev) =>
        prev.includes(numericId)
          ? prev.filter((x) => x !== numericId)
          : [...prev, numericId]
      );
    };

    //funzione per svuotare preferiti, lo setto direttamente ad array vuoto
    const clearFavorites = () => setFavoriteIds([]);

    return { favoriteIds, isFavorite, toggleFavorite, clearFavorites };
  }, [favoriteIds]); //rirendirizzo il comp solo al cambiare di favoriteIds

  return (
    <FavoriteVideogamesContext.Provider value={value}>
      {children}
    </FavoriteVideogamesContext.Provider>
  );
};

const useFavoriteVideogames = () => {
  const context = useContext(FavoriteVideogamesContext);
  if (!context) {
    throw new Error(
      "useFavoriteVideogames deve essere usato dentro <FavoriteVideogamesProvider>"
    );
  }
  return context;
};

export { FavoriteVideogamesProvider, useFavoriteVideogames };
