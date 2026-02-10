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

function App() {


  return (
    <>
        {/* rotte applicazione */}
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/videogames" element={<Videogames />} />
            <Route path="/popular-videogames" element={<PopularVideogames />} />
            <Route path="/contattaci" element={<Contattaci />} />
            <Route path="/preferiti" element={<Preferiti />} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
