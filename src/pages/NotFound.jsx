//pagina error se l utente inserisce un path non valido 
import { Link } from "react-router-dom";

//importo il relativo css
import '../pages css/NotFound.css'

const NotFound = () => {
    return (
        <>
            <div className="container">
                <img id="crash" src="/crash.png" alt="404-crash"/>
                <h1 id="not-found">Errore 404 pagina non trovata</h1>
                <div className="center">
                    <Link className="back" to={`/`}>
                        Torna alla home
                    </Link>
                </div>
            </div>
        </>
    )
}

export default NotFound