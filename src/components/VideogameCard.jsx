//importo il relativo css
import "../components css/VideogameCard.css";

//importo memo
import { memo } from 'react';

//importo link da react router dom
import { Link } from 'react-router-dom';

const VideogameCard = memo(function VideogameCard({ game }) {

    return (
        <>
            <Link className="single-card" to={`/videogames/${game.id}`}>
                <section>
                    <div>
                        <h2>{game.title}</h2>
                        <h3>{game.category}</h3>
                    </div>
                </section>
            </Link>
        </>
    );
});

export default VideogameCard