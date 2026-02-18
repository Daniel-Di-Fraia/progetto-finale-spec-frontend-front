//importo il relativo css
import "../components css/VideogameCard.css";

//importo memo
import { memo } from 'react';

//importo link da react router dom
import { Link } from 'react-router-dom';

//import del context per i preferiti
import { useFavoriteVideogames } from "../context/FavoriteVideogamesContext";

//importo context della modale
import { useConfirm } from "../context/ModalContext";

const VideogameCard = memo(function VideogameCard({ game }) {

    // Uso l'hook del context dei preferiti
    const { isFavorite, toggleFavorite } = useFavoriteVideogames();

    //uso il context per la modale di conferma
    const { confirm } = useConfirm();

    //funzione per rimozione gioco dai preferiti tramite modale di conferma
    const onHeartClick = async (gameId) => {
        const id = Number(gameId);
        const isAlreadyFav = isFavorite(id);

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
                                onHeartClick(game.id);
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