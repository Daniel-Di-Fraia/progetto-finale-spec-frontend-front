//importo memo
import { memo } from 'react';

//importo link da react router dom
import { Link } from 'react-router-dom';

const ConsoleCard = memo(function ConsoleCard({ console }) {

    return (
        <>
            <Link className="single-card" to={`/consoles/${console.id}`}>
                <section>
                    <h2>{console.title}</h2>

                    <div className="genre-flex">
                        <h3>{console.category}</h3>
                    </div>
                </section>
            </Link>


        </>
    );
});

export default ConsoleCard