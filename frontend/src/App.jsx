import 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import PlaceDetails from './Pages/PlaceDetails';  // Este componente no se toca
import Dashboard from './Pages/Dashboard';
import PlacesPage from './Pages/PlacesPage';
import UsersPage from './Pages/UsersPage';
import MisReseñas from './Pages/MisReseñas';
import LugaresPage from './Pages/LugaresPage';  // Este es el componente para la lista de lugares

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place/:placeId" element={<PlaceDetails />} />  {/* No se toca */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/places" element={<PlacesPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/mis-reseñas" element={<MisReseñas />} />
        <Route path="/lugares" element={<LugaresPage />} />  {/* Ruta para la lista de lugares */}
        <Route path="/lugares/:placeId" element={<PlaceDetails />} />  {/* Se usa PlaceDetails aquí */}
      </Routes>
    </Router>
  );
}

export default App;
