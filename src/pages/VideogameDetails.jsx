// import dell'hook per il parametro
import { useParams, useNavigate } from "react-router-dom";

//import di useEffect e UseState
import { useState, useEffect } from "react";

//import del context per i preferiti
import { useFavoriteVideogames } from "../context/FavoriteVideogamesContext";

//importo il relativo css
import "../pages css/VideogameDetails.css"

//importo context della modale
import { useConfirm } from "../context/ModalContext";

// richiamo variabile di ambiente
const url = import.meta.env.VITE_API_URL;

const VideogameDetails = () => {

  // recuperiamo (id) tramite il parametro dinamico
  const { id } = useParams();

  //navigate per rotta errore
  const navigate = useNavigate();

  //variabile di stato per chiamata singolo gioco
  const [videogame, setVideogame] = useState(null);

  //variabile di stato per errore
  const [error, setError] = useState(null);

  //variabile di stato per il caricamento
  const [isLoading, setIsLoading] = useState(true);

  // Uso l'hook del context dei preferiti
  const { isFavorite, toggleFavorite } = useFavoriteVideogames();

  //uso il context per la modale di conferma
  const { confirm } = useConfirm();


  //funzione per la chiamata al singolo gioco
  async function fetchSingleVideogame() {

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${url}/videogames/${id}`);
      if (!response.ok) {
        navigate("/404", { replace: true });
        return;
      }
      const gioco = await response.json();
      console.log("Dati ricevuti dall'API:", gioco.videogame);
      setVideogame(gioco.videogame);
    } catch (err) {
      setError(err.message);
      setVideogame(null);
    } finally {
      setIsLoading(false);
    }

  }

  //effettuiamo la chiamata al singolo gioco, dipendente dall id
  useEffect(() => {
    fetchSingleVideogame();
  }, [id]);

  if (isLoading) return <h1>Caricamento...</h1>;
  if (error) return <h1>Errore: {error}</h1>;
  if (!videogame) return <h1>Gioco non trovato!</h1>;

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
      <section
        style={{
          backgroundImage: `
          linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)),
          url(${videogame.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: 650,
        }}
      >
        <div className="container pad-det">
          <div className="detail-section detail-flex">
            <div>
              <img src={videogame.image} alt={videogame.title} />
            </div>
            <div className="info-game">
              <h1>{videogame.title}</h1>
              <h2>Genere: {videogame.category}</h2>
              <p><strong>Valutazione:</strong> {videogame.review}</p>
              <p><strong>Data di rilascio:</strong> {videogame.releaseDate}</p>
              <p className="add-it"><strong>Aggiungilo ai preferiti!</strong></p>
              <button id="add-preferiti" onClick={() => onHeartClick(videogame.id)}>
                {isFavorite(videogame.id) ? "❤️" : "🤍"}
              </button>
            </div>

          </div>
          <div className="description">
            <strong className="descr">Descrizione:</strong>
            <p>{videogame.description}</p>
            <strong className="descr">Sviluppatore:</strong>
            <p>{videogame.sviluppatore}</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default VideogameDetails