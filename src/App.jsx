//import per css
import './App.css'

//importiamo browser router per rotte
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//importiamo pagine e componenti
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import Videogames from './pages/Videogames';
import Consoles from './pages/Consoles';
import Preferiti from './pages/Preferiti';
import VideogameDetails from './pages/VideogameDetails';
import ConsoleDetails from './pages/ConsoleDetails';
import NotFound from './pages/NotFound';

//importiamo il provider della chiamata dei giochi
import { VideogamesProvider } from './context/VideogamesContext';

//importiamo il provider per i preferiti
import { FavoriteVideogamesProvider } from './context/FavoriteVideogamesContext';

//importiamo il provider per la modale di conferma
import { ConfirmProvider } from "./context/ModalContext";

//importiamo il provider della chiamata delle console
import { ConsolesProvider } from './context/ConsolesContext';

function App() {


  return (
    <>
      {/* avvolgo tutto app con i provider per rendere disponibili i dati nei context */}
      <ConfirmProvider>
        <ConsolesProvider>
          <FavoriteVideogamesProvider>
            <VideogamesProvider>
              {/* rotte applicazione */}
              <BrowserRouter>
                <NavBar />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/videogames" element={<Videogames />} />
                  <Route path="/videogames/:id" element={<VideogameDetails />} />
                  <Route path="/consoles" element={<Consoles />} />
                  <Route path="/consoles/:id" element={<ConsoleDetails />} />
                  <Route path="/preferiti" element={<Preferiti />} />
                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </VideogamesProvider>
          </FavoriteVideogamesProvider>
        </ConsolesProvider>
      </ConfirmProvider>
    </>
  )
}

export default App
