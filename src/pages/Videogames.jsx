//importo variabile globale, risultato da chiamata api
import { useVideogames } from "../context/VideogamesContext";

//importo useMemo e useState da react
import { useState, useMemo, useCallback } from 'react';

//importiamo il componente videogamecard per giochi singoli 
import VideogameCard from "../components/VideogameCard";

//importo il relativo css
import '../pages css/Videogames.css'

//funzione debounce generica
function debounce(callback, delay) {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  }
}

function Videogames() {

  const { videogames } = useVideogames();

  //variabile di stato per ricerca
  const [search, setSearch] = useState('');

  const debounceSearch = useCallback(debounce(setSearch, 500));

  //array filtrato per ricerca
  const filteredVideogames = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return videogames;

    return videogames.filter((game) =>
      (game.title || "").toLowerCase().includes(query)
    );
  }, [videogames, search]);


  return (
    <>
      <section className='container'>
        <h1>Lista Giochi</h1>
        <input
          type="text"
          placeholder="Cerca un videogioco.."
          onChange={(e) => debounceSearch(e.target.value)}
          className="search-input"
        />

            {/* passo il nuovo array filtrato */}
            {filteredVideogames.map((game) => (
              // Passo l oggetto card videogame specifico come prop
              <VideogameCard key={game.id} game={game} />
            ))}
      </section>
    </>
  )
}

export default Videogames