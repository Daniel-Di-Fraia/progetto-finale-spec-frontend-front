//importo il relativo css
import "../components css/VideogameCard.css";

//importo memo
import { memo } from 'react';

//importo link da react router dom
import { Link } from 'react-router-dom';

const VideogameCard = memo(function VideogameCard({ game }) {

    return (
        <>
            <section>
                <div>
                    <img src={game.image} alt={game.title}/>
                </div>
                <div>
                    <h2>{game.title}</h2>
                    <h3>{game.category}</h3>
                </div>
            </section>
        </>
    );
});

export default VideogameCard