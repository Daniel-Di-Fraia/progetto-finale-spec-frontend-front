// import dell'hook per il parametro
import { useParams } from "react-router-dom";

//import di useEffect e UseState
import { useState, useEffect } from "react";

// richiamo variabile di ambiente
const url = import.meta.env.VITE_API_URL;

const ConsoleDetails = () => {

    // recuperiamo (id) tramite il parametro dinamico
    const { id } = useParams();

    //variabile di stato per chiamata singola console
    const [singleConsole, setSingleConsole] = useState(null);

    //variabile di stato per errore
    const [error, setError] = useState(null);

    //variabile di stato per il caricamento
    const [isLoading, setIsLoading] = useState(true);


    //funzione per la chiamata alla singola console
    async function fetchSingleConsole() {

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${url}/consoles/${id}`);
            if (!response.ok) {
                throw new Error('errore nel caricamento dei dati');
            }
            const con = await response.json();
            console.log("Dati ricevuti dall'API:", con.console);
            setSingleConsole(con.console);
        } catch (err) {
            setError(err.message);
            setSingleConsole(null);
        } finally {
            setIsLoading(false);
        }

    }

    //effettuiamo la chiamata alla singola console, dipendente dall id
    useEffect(() => {
        fetchSingleConsole();
    }, [id]);

    if (isLoading) return <h1>Caricamento...</h1>;
    if (error) return <h1>Errore: {error}</h1>;
    if (!singleConsole) return <h1>Console non trovata!</h1>;

    return (
        <>
            <section
                style={{
                    backgroundImage: `
          linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)),
          url(${singleConsole.imageBackground})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    height: 650,
                }}
            >
                <div className="container pad-det">
                    <div className="detail-section detail-flex">
                        <div>
                            <img src={singleConsole.image} alt={singleConsole.title} />
                        </div>
                        <div className="info-game">
                            <h1>{singleConsole.title}</h1>
                            <h2>Genere: {singleConsole.category}</h2>
                            <p><strong>Generazione:</strong> {singleConsole.generation}</p>
                            <p><strong>Data di rilascio:</strong> {singleConsole.releaseYear}</p>
                            <p><strong>Sviluppatore:</strong> {singleConsole.developer}</p>
                        </div>

                    </div>
                    <div className="description">
                        <strong className="descr">Descrizione:</strong>
                        <p>{singleConsole.description}</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ConsoleDetails