//importo il relativo css
import "../components css/VideogameCard.css";

//importo memo
import { memo } from 'react';

//importo link da react router dom
import { Link } from 'react-router-dom';

//import del context per i preferiti
import { useFavoriteVideogames } from "../context/FavoriteVideogamesContext";

const VideogameCard = memo(function VideogameCard({ game }) {

    // Uso l'hook del context dei preferiti
    const { isFavorite, toggleFavorite } = useFavoriteVideogames();

    return (
        <>
            <Link className="single-card" to={`/videogames/${game.id}`}>
                <section>
                    <h2>{game.title}</h2>

                    <div className="genre-flex">
                        <h3>{game.category}</h3>

                        <button
                            id="prefe-btn"
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleFavorite(game.id);
                            }}
                        >
                            {isFavorite(game.id) ? "❤️" : "🤍"}
                        </button>
                    </div>
                </section>
            </Link>


        </>
    );
});

export default VideogameCard