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

  //prendiamo dati dal context
  const { videogames } = useVideogames();

  //variabile di stato per ricerca
  const [search, setSearch] = useState("");

  const debounceSearch = useCallback(debounce(setSearch, 500), []);

  //variabile di stato per filtro categoria
  const [category, setCategory] = useState("")

  const categoryChange = (e) => {
    setCategory(e.target.value);
  }

  //array filtrato per ricerca e filtro genere
  const filteredVideogames = useMemo(() => {
    //normaliziamo input per il controllo
    const query = search.trim().toLowerCase();
    const genre = category.trim().toLowerCase();

    //scorriamo l array di giochi e lo filtriamo
    return videogames.filter((game) => {

      //normaliziamo i campi del gioco per il controllo
      const title = (game.title || "").toLowerCase();
      const gameGenre = (game.category || "").toLowerCase();

      //condizioni per far passare un gioco e/o un genere
      const matchSearch = !query || title.includes(query);
      const matchGenre = !genre || gameGenre.includes(genre);

      //risultato finale che deve rispettare entrambi 
      return matchSearch && matchGenre;
    });
  }, [videogames, search, category]);



  return (
    <>
      <section className='allgames'>
        <div className="container">
          <h1>Lista Giochi</h1>

          {/* barra di ricerca per cercare un gioco specifico */}
          <input
            type="text"
            placeholder="Cerca un videogioco.."
            onChange={(e) => debounceSearch(e.target.value)}
            className="search-input"
          />

          {/* select per filtrare la categoria */}
          <span className="select-wrap">
            <select value={category} onChange={categoryChange}>
              <option value="">-Scegli genere-</option>
              <option value="soulslike">Soulslike</option>
              <option value="rpg">RPG</option>
              <option value="action">Action</option>
              <option value="platform">Platform</option>
              <option value="metroidvania">Metroidvania</option>
            </select>
          </span>

          <div className="cards">
            {/* passo il nuovo array filtrato */}
            {filteredVideogames.map((game) => (
              //passo l oggetto card videogame specifico come prop
              <VideogameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Videogames