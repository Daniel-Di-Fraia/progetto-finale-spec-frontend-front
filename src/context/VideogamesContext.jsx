import { createContext, useContext, useState, useEffect } from 'react';

//oggetto che servirà per condividere dati tra componenti senza dover passare props
const VideogamesContext = createContext();

// richiamo variabile di ambiente
const url = import.meta.env.VITE_API_URL;

//creazione provider che conterrà i valori del contesto condivisibili in tutta la pagina
const VideogamesProvider = ({ children }) => {

    //stato per raccogliere dati chiamata api
    const [videogames, setVideogames] = useState([]);
    const [error, setError] = useState(null);

    //funzione per chiamata api di tutti i giochi
    async function fetchVideogames() {

        try {
            const response = await fetch(`${url}/videogames`);
            if (!response.ok) {
                throw new Error('errore nel caricamento dei dati');
            }
            const data = await response.json();
            console.log("Dati ricevuti dall'API:", data);
            setVideogames(data);
        } catch (err) {
            console.error("Errore durante la fetch:", err);
            setError(err.message);
        }

    }

    //effettuiamo la chiamata solo al primo render
    useEffect(() => {
        fetchVideogames();
    }, []);

    //provider del contesto
    return (
        <VideogamesContext.Provider
            // dati resi disponibili 
            value={{ videogames }}>
            {/* componenti figli inclusi dal provider */}
            {children}
        </VideogamesContext.Provider>
    )
}

const useVideogames = () => {
    const context = useContext(VideogamesContext);
    return context;
};

export { VideogamesProvider, useVideogames }