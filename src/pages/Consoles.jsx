//importo variabile globale, risultato da chiamata api
import { useConsoles } from "../context/ConsolesContext";

//importo useMemo e useState da react
import { useState, useMemo, useCallback } from 'react';

//importiamo il componente consolecard per le singole console 
import ConsoleCard from "../components/ConsoleCard";

//importo il relativo css
import '../pages css/Consoles.css'

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

function Consoles() {

  //prendiamo dati dal context delle consoles
  const { consoles } = useConsoles();

  //variabile di stato per ricerca
  const [search, setSearch] = useState("");

  const debounceSearch = useCallback(debounce(setSearch, 500), []);

  //variabile di stato per filtro categoria
  const [category, setCategory] = useState("")

  const categoryChange = (e) => {
    setCategory(e.target.value);
  }

  //variabile di stato per filtro ordine alfabetico
  const [alphSortOrder, setAlphSortOrder] = useState("az");

  //array filtrato per ricerca e filtro brand
  const filteredConsoles = useMemo(() => {
    //normaliziamo input per il controllo
    const query = search.trim().toLowerCase();
    const genre = category.trim().toLowerCase();

    //scorriamo l array di consoles e lo filtriamo
    const filtered = consoles.filter((console) => {

      //normaliziamo i campi della console per il controllo
      const title = (console.title || "").toLowerCase();
      const consoleBrand = (console.category || "").toLowerCase();

      //condizioni per far passare una console e/o un brand
      const matchSearch = !query || title.includes(query);
      const matchBrand = !genre || consoleBrand.includes(genre);

      //risultato finale che deve rispettare entrambi 
      return matchSearch && matchBrand;
    });

    const alphSorted = [...filtered].sort((a, b) =>
      (a.title || "").localeCompare(b.title || "")
    );

    return alphSortOrder === "az" ? alphSorted : alphSorted.reverse();
  }, [consoles, search, category, alphSortOrder]);



  return (
    <>
      <section className='allconsoles'>
        <div className="container">
          <h1>Console più popolari</h1>

          {/* barra di ricerca per cercare una console specifico */}
          <input
            type="text"
            placeholder="Cerca una console..."
            onChange={(e) => debounceSearch(e.target.value)}
            className="search-input"
          />

          {/* select per filtrare la categoria */}
          <span className="select-wrap">
            <select value={category} onChange={categoryChange}>
              <option value="">-Scegli brand-</option>
              <option value="sony">Sony</option>
              <option value="microsoft">Microsoft</option>
              <option value="nintendo">Nintendo</option>
              <option value="valve">Valve</option>
            </select>
          </span>

          {/* button per mettere le console in ordine alfabetico */}
          <span>
            <button type="button" className="sort-btn" onClick={() => setAlphSortOrder((prev) => (prev === "az" ? "za" : "az"))}>
              Ordine: {alphSortOrder === "az" ? "A → Z" : "Z → A"}
            </button>
          </span>


          {filteredConsoles.length === 0 ? (
            <p>Nessuna console trovata.</p>
          ) : (
            <div className="cards">
              {filteredConsoles.map((console) => (
                <ConsoleCard key={console.id} console={console} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Consoles