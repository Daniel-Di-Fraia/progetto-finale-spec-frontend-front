// import dell'hook per il parametro
import { useParams } from "react-router-dom";

//import di useEffect e UseState
import { useState, useEffect } from "react";

//importo il relativo css
import "../pages css/VideogameDetails.css"

// richiamo variabile di ambiente
const url = import.meta.env.VITE_API_URL;

const VideogameDetails = () => {

  // recuperiamo (id) tramite il parametro dinamico
  const { id } = useParams();

  //variabile di stato per chiamata singolo gioco
  const [videogame, setVideogame] = useState(null);

  //variabile di stato per errore
  const [error, setError] = useState(null);

  //variabile di stato per il caricamento
  const [isLoading, setIsLoading] = useState(true);

  //funzione per la chiamata al singolo gioco
  async function fetchSingleVideogame() {

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${url}/videogames/${id}`);
      if (!response.ok) {
        throw new Error('errore nel caricamento dei dati');
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

  return (
    <>
    <section className="container">
      <div className="detail-section detail-flex">
        <div>
          <img src={videogame.image} alt={videogame.title} />
        </div>
        <div className="info-game">
          <h1>{videogame.title}</h1>
          <h2>Genere: {videogame.category}</h2>
          <p><strong>Valutazione:</strong> {videogame.review}</p>
          <p><strong>Data di rilascio:</strong> {videogame.releaseDate}</p>
          <p><strong>Aggiungilo ai preferiti!</strong></p>
          <div>⭣</div>
          <div>&#10084;</div>
        </div>
      </div>
      <strong>Descrizione:</strong>
      <p>{videogame.description}</p>
      </section>
    </>
  )
}

export default VideogameDetails