//importo il relativo css
import "../components css/NavBar.css";

//importiamo navlink da react router dom
import { NavLink } from "react-router-dom"

function NavBar() {


    return (
        <>
            <header className="header-flex">
                <NavLink to="/">
                    <img src="/logo-strk.png" alt="logo" id="logo" />
                </NavLink>
                <ul className="nav-list">
                    <li>
                        <NavLink to="videogames" className={({ isActive }) => (isActive ? "navlink active" : "navlink")}>
                            Tutti i giochi
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="popular-videogames" className={({ isActive }) => (isActive ? "navlink active" : "navlink")}>
                            Console più popolari
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="contattaci" className={({ isActive }) => (isActive ? "navlink active" : "navlink")}>
                            Contattaci
                        </NavLink>
                    </li>
                </ul>
                <NavLink to="preferiti" className={({ isActive }) => (isActive ? "navlink active" : "navlink")}>
                    <div id="pref">&#10084;</div>
                </NavLink>
            </header>
        </>
    )
}

export default NavBar