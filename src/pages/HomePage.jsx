//importo il relativo css
import '../pages css/HomePage.css'

import { Link } from "react-router-dom";

function HomePage() {


  return (
    <>
      <main className="home">
        <section className="container">
          <h1>Benvenuto nel tuo catalogo giochi!</h1>
          <p>
            Scorri, confronta e trova il gioco perfetto per il tuo mood del momento.
            Aggiungi ai preferiti i titoli top, crea una lista personalizzata da consultare quando vuoi e preparati a partire: la prossima avventura ti aspetta.
          </p>
        </section>
        <section className="container">
          <h2>Generi in Tendenza</h2>
          <div className="home-trending">
            <Link to="/videogames?category=Soulslike" className="card">
              <span className="card-label">Soulslike</span>
            </Link>
            <Link to="/videogames?category=RPG" className="card">
              <span className="card-label">RPG</span>
            </Link>
            <Link to="/videogames?category=Platform" className="card">
              <span className="card-label">Platform</span>
            </Link>

          </div>
        </section>
      </main>
    </>
  )
}

export default HomePage