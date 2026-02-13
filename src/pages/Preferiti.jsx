//importo di link e dei 2 context per preferiti e chiamata api
import { Link } from "react-router-dom";
import { useFavoriteVideogames } from "../context/FavoriteVideogamesContext";
import { useVideogames } from "../context/VideogamesContext";

//import del relativo css
import "../pages css/Preferiti.css"

export default function FavoritesPage() {

  //consumo context
  const { favoriteIds, toggleFavorite, clearFavorites } = useFavoriteVideogames();
  const { videogames } = useVideogames();

  //controllo se videogames è gia un array
  const list = Array.isArray(videogames) ? videogames : videogames?.videogames || [];

  //filtro i giochi e tengo solo quelli presenti in favoritesIds
  const favorites = list.filter((g) => favoriteIds.includes(Number(g.id)));

  return (
    <section className="bkg-prefe">
      <div className="container pad-prefe">
        <div>
          <h1>Preferiti</h1>

          <button type="button" onClick={clearFavorites} className="clear-fav-btn">
            Svuota preferiti
          </button>
        </div>

        {/* se l array è vuoto, in pagina mostro questo p */}
        <div className="prefe-flex">
          {favorites.length === 0 ? (
            <p>Nessun gioco nei preferiti.</p>
          ) : (
            favorites.map((game) => (
              <article key={game.id} className="single-prefe info-flex">
                <Link to={`/videogames/${game.id}`}>
                  <h2>{game.title}</h2>
                  <div>
                    <h3>{game.category}</h3>
                  </div>
                </Link>

                <button
                  id="prefe-btn"
                  type="button"
                  onClick={() => toggleFavorite(game.id)}
                  aria-label="Rimuovi dai preferiti"
                >
                  ❤️
                </button>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
