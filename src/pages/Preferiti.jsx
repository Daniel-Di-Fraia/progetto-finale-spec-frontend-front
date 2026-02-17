import { Link } from "react-router-dom";
//importo context preferiti
import { useFavoriteVideogames } from "../context/FavoriteVideogamesContext";
//importo context videogames
import { useVideogames } from "../context/VideogamesContext";
//importo hook React
import { useEffect, useMemo, useRef, useState } from "react";
//importo il relativo css
import "../pages css/Preferiti.css";
//importo context della modale
import { useConfirm } from "../context/ModalContext";

//base url API
const url = import.meta.env.VITE_API_URL;

//massimo giochi confrontabili
const MAX_COMPARE = 4;

//fetch del singolo gioco
async function fetchSingleVideogame(id) {
  const res = await fetch(`${url}/videogames/${id}`);
  if (!res.ok) throw new Error("errore nel caricamento dei dati");
  const data = await res.json();
  return data.videogame;
}

export default function FavoritesPage() {
  //prendo id dei preferiti e le funzioni per i pulsanti
  const { favoriteIds, toggleFavorite, clearFavorites } = useFavoriteVideogames();
  //prendo lista videogames dal context
  const { videogames } = useVideogames();

  //normalizzo videogames per essere sicuro di avere sempre un array
  const list = Array.isArray(videogames) ? videogames : videogames?.videogames || [];

  //filtro la lista e tengo solo i giochi che stanno nei preferiti
  const favorites = useMemo(
    () => list.filter((g) => favoriteIds.includes(Number(g.id))),
    [list, favoriteIds]
  );

  //id selezionati per il confronto (max 4)
  const [compareIds, setCompareIds] = useState([]);

  //variabile di stato per array finale di giochi completi da mostrare in tabella confronto
  const [comparedGames, setComparedGames] = useState([]);

  //stato caricamento/errore del confronto
  const [isLoadingCompare, setIsLoadingCompare] = useState(false);
  const [compareError, setCompareError] = useState(null);

  //riferimento gioco completo (non triggera rerender quando la aggiorno)
  const cacheRef = useRef({});

  //toggle confronto che aggiunge/rimuove un id e rispetta il limite MAX_COMPARE
  const toggleCompare = (idRaw) => {
    const id = String(idRaw);

    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, id];
    });
  };

  //se rimuovo un gioco dai preferiti, lo tolgo anche dal confronto
  useEffect(() => {
    setCompareIds((prev) => prev.filter((id) => favoriteIds.includes(Number(id))));
  }, [favoriteIds]);

  //quando cambiano i compareIds, scarico i dettagli mancanti e aggiorno comparedGames
  useEffect(() => {
    //se non ho selezionati, resetto tabella/stati
    if (compareIds.length === 0) {
      setComparedGames([]);
      setIsLoadingCompare(false);
      setCompareError(null);
      return;
    }

    //flag per ignorare risultati se cambia selezione o smonto il componente
    let cancelled = false;

    setIsLoadingCompare(true);
    setCompareError(null);

    //riferimento in memoria
    const cached = cacheRef.current;

    //prendo solo gli id che non ho ancora in memoria
    const missingIds = compareIds.filter((id) => !cached[id]);

    const load = async () => {
      try {
        //fetch in parallelo degli id che non ci sono
        if (missingIds.length > 0) {
          const fetched = await Promise.all(missingIds.map(fetchSingleVideogame));
          if (cancelled) return;

          //salvo i risultati in memoria
          for (const g of fetched) {
            cached[String(g.id)] = g;
          }
        }

        //ricostruisco l’array in ordine come compareIds
        const ordered = compareIds.map((id) => cached[id]).filter(Boolean);

        if (cancelled) return;
        setComparedGames(ordered);
      } catch (err) {
        if (cancelled) return;
        setCompareError(err.message);
        setComparedGames([]);
      } finally {
        if (cancelled) return;
        setIsLoadingCompare(false);
      }
    };

    load();

    //cleanup
    return () => {
      cancelled = true;
    };
  }, [compareIds]);

  const { confirm } = useConfirm();

  const onHeartClick = async (gameId) => {
    const id = Number(gameId);
    const isAlreadyFav = favoriteIds.includes(id);

    if (!isAlreadyFav) {
      toggleFavorite(id);
      return;
    }

    const ok = await confirm({
      title: "Conferma rimozione",
      message: "Vuoi rimuovere questo gioco dai preferiti?",
      confirmText: "Rimuovi",
      cancelText: "Annulla",
    });

    if (ok) toggleFavorite(id);
  };

  return (
    <section className="bkg-prefe">
      <div className="container pad-prefe">
        <div>
          <h1>Preferiti</h1>

          {/* svuota tutti i preferiti */}
          <button type="button" onClick={clearFavorites} className="clear-fav-btn">
            Svuota preferiti
          </button>
        </div>

        <div className="prefe-layout">
          {/* colonna lista preferiti */}
          <div className="prefe-left">
            <h2 className="prefe-subtitle">I tuoi preferiti</h2>

            <div className="prefe-list-vertical">
              {favorites.length === 0 ? (
                <p>Nessun gioco nei preferiti.</p>
              ) : (
                favorites.map((game) => {
                  //dati utili per UI e disabilitazione bottone
                  const id = String(game.id);
                  const selected = compareIds.includes(id);
                  const disableAdd = !selected && compareIds.length >= MAX_COMPARE;

                  return (
                    <article key={game.id} className="single-prefe info-flex">
                      {/* link al dettaglio */}
                      <Link to={`/videogames/${game.id}`}>
                        <h2>{game.title}</h2>
                        <div>
                          <h3>{game.category}</h3>
                        </div>
                      </Link>

                      {/* preferito + confronto */}
                      <div className="prefe-actions">
                        {/* rimuovi dai preferiti */}
                        <button
                          id="prefe-btn"
                          type="button"
                          onClick={() => onHeartClick(game.id)}
                          aria-label="Rimuovi dai preferiti"
                        >
                          ❤️
                        </button>

                        {/* aggiungi/rimuovi dal confronto */}
                        <button
                          type="button"
                          onClick={() => toggleCompare(game.id)}
                          disabled={disableAdd}
                          className="compare-btn"
                        >
                          {selected ? "Rimuovi confronto" : "Confronta"}
                        </button>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </div>

          {/* colonna pannello confronto */}
          <aside className="prefe-right">
            <div className="compare-panel">
              <h2>Confronto (max {MAX_COMPARE})</h2>

              {/* nessuna selezione */}
              {compareIds.length === 0 ? (
                <p>Seleziona fino a {MAX_COMPARE} giochi dai preferiti per confrontarli.</p>
              ) : (
                <>
                  {/* chips per rimuovere rapidamente un gioco dal confronto */}
                  <div className="compare-chips">
                    {compareIds.map((id) => {
                      const light = favorites.find((f) => String(f.id) === id);
                      return (
                        <button key={id} type="button" onClick={() => toggleCompare(id)}>
                          Rimuovi {light ? light.title : `#${id}`}
                        </button>
                      );
                    })}
                  </div>

                  {/* feedback fetch */}
                  {isLoadingCompare && <p>Caricamento dati confronto...</p>}
                  {compareError && <p>Errore confronto: {compareError}</p>}

                  {/* tabella, la mostro solo con almeno 2 giochi */}
                  {comparedGames.length >= 2 ? (
                    <div className="compare-table">
                      {/* header tabella */}
                      <div className="row head">
                        <div className="cell label"></div>
                        {comparedGames.map((g) => (
                          <div key={g.id} className="cell">
                            <strong>{g.title}</strong>
                          </div>
                        ))}
                      </div>

                      {/* righe tabela con proprieta */}
                      <div className="row">
                        <div className="cell label"><strong>Categoria</strong></div>
                        {comparedGames.map((g) => (
                          <div key={g.id} className="cell">{g.category}</div>
                        ))}
                      </div>

                      <div className="row">
                        <div className="cell label"><strong>Review</strong></div>
                        {comparedGames.map((g) => (
                          <div key={g.id} className="cell">{g.review}</div>
                        ))}
                      </div>

                      <div className="row">
                        <div className="cell label"><strong>Anno uscita</strong></div>
                        {comparedGames.map((g) => (
                          <div key={g.id} className="cell">{g.releaseDate}</div>
                        ))}
                      </div>

                      <div className="row">
                        <div className="cell label"><strong>Sviluppatore</strong></div>
                        {comparedGames.map((g) => (
                          <div key={g.id} className="cell">{g.sviluppatore}</div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p>Aggiungi almeno un altro gioco per confrontare.</p>
                  )}
                </>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
