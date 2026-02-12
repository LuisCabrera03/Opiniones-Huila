import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import { ROUTES } from './utils/constants';
import { Toaster } from './components/ui/toaster';

// Pages
import Home from './Pages/Home';
import LoginNew from './Pages/LoginNew';
import PlaceDetails from './Pages/PlaceDetails';
import Dashboard from './Pages/Dashboard';
import PlacesPage from './Pages/PlacesPage';
import UsersPage from './Pages/UsersPage';
import MisReseñas from './Pages/MisReseñas';
import LugaresPage from './Pages/LugaresPage';

// App component with theme support
const AppContent = () => {
  const { state } = useAppContext();

  // Apply theme class to document root
  useEffect(() => {
    const root = document.documentElement;
    if (state.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [state.theme]);

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.LOGIN} element={<LoginNew />} />
          <Route path={`${ROUTES.PLACE_DETAILS}/:placeId`} element={<PlaceDetails />} />
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.PLACES} element={<PlacesPage />} />
          <Route path={ROUTES.USERS} element={<UsersPage />} />
          <Route path={ROUTES.MY_REVIEWS} element={<MisReseñas />} />
          <Route path={ROUTES.LUGARES} element={<LugaresPage />} />
          <Route path={`${ROUTES.LUGARES}/:placeId`} element={<PlaceDetails />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
};

// Main App component with providers
function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
