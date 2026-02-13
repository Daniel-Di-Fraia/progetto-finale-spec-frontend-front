//import per css
import './App.css'

//importiamo browser router per rotte
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//importiamo pagine e componenti
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import Videogames from './pages/Videogames';
import PopularVideogames from './pages/PopularVideogames';
import Contattaci from './pages/Contattaci';
import Preferiti from './pages/Preferiti';
import VideogameDetails from './pages/VideogameDetails';

//importiamo il provider della chiamata
import { VideogamesProvider } from './context/VideogamesContext';

//importiamo il provider per i preferiti
import { FavoriteVideogamesProvider } from './context/FavoriteVideogamesContext';

function App() {


  return (
    <>
      {/* avvolgo tutto app con i provider per rendere disponibili i dati in context */}
      <FavoriteVideogamesProvider>
        <VideogamesProvider>
          {/* rotte applicazione */}
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/videogames" element={<Videogames />} />
              <Route path="/videogames/:id" element={<VideogameDetails />} />
              <Route path="/popular-videogames" element={<PopularVideogames />} />
              <Route path="/contattaci" element={<Contattaci />} />
              <Route path="/preferiti" element={<Preferiti />} />
            </Routes>
          </BrowserRouter>
        </VideogamesProvider>
      </FavoriteVideogamesProvider>
    </>
  )
}

export default App
