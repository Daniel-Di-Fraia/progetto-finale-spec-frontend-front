import { createContext, useContext, useState, useEffect } from 'react';

//oggetto che servirà per condividere dati tra componenti senza dover passare props
const ConsolesContext = createContext();

// richiamo variabile di ambiente
const url = import.meta.env.VITE_API_URL;

//creazione provider che conterrà i valori del contesto condivisibili in tutta la pagina
const ConsolesProvider = ({ children }) => {

    //stato per raccogliere dati chiamata api
    const [consoles, setConsoles] = useState([]);
    const [error, setError] = useState(null);

    //funzione per chiamata api di tutte le consoles
    async function fetchConsoles() {

        try {
            const response = await fetch(`${url}/consoles`);
            if (!response.ok) {
                throw new Error('errore nel caricamento dei dati');
            }
            const data = await response.json();
            console.log("Dati ricevuti dall'API:", data);
            setConsoles(data);
        } catch (err) {
            console.error("Errore durante la fetch:", err);
            setError(err.message);
        }

    }

    //effettuiamo la chiamata solo al primo render
    useEffect(() => {
        fetchConsoles();
    }, []);

    //provider del contesto
    return (
        <ConsolesContext.Provider
            // dati resi disponibili 
            value={{ consoles }}>
            {/* componenti figli inclusi dal provider */}
            {children}
        </ConsolesContext.Provider>
    )
}

const useConsoles = () => {
    const context = useContext(ConsolesContext);
    return context;
};

export { ConsolesProvider, useConsoles }