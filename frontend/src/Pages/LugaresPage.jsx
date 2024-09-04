import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, Container, Paper, Divider, Fade, Grid } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Tarjetas from '../Components/Tarjeta';  // Asegúrate de que la ruta sea correcta
import Header from '../Common/Header';  // Asegúrate de que la ruta sea correcta

const LugaresPage = () => {
  const [categories, setCategories] = useState([]);
  const [places, setPlaces] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://resenas-backend-20b57109bfac.herokuapp.com/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const category = query.get('category');
    setSelectedCategory(category || '');

    const fetchPlaces = async () => {
      setLoading(true);
      try {
        const response = category
          ? await axios.get(`https://resenas-backend-20b57109bfac.herokuapp.com/api/places?category=${category}`)
          : await axios.get('https://resenas-backend-20b57109bfac.herokuapp.com/api/places');
        setPlaces(response.data);
      } catch (error) {
        console.error('Error al obtener los lugares:', error);
      }
      setLoading(false);
    };
    
    fetchPlaces();
  }, [location.search]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    navigate(`/lugares?category=${category}`);
  };

  // Filtrar los lugares por categoría seleccionada
  const filteredPlaces = selectedCategory
    ? places.filter(place => place.category_id === parseInt(selectedCategory))
    : places;

  return (
    <Box>
      {/* Header con un color más atractivo y diseño */}
      <Header 
        headerColor="linear-gradient(135deg, #ff6f61, #d7263d, #bd1e51)" 
        onCategoryChange={handleCategoryChange} 
        categories={categories} 
        selectedCategory={selectedCategory}
        sx={{
          color: '#fff',
          padding: '20px',
          background: 'linear-gradient(135deg, #ff6f61 0%, #d7263d 50%, #bd1e51 100%)',
          borderBottomLeftRadius: '50px',
          borderBottomRightRadius: '50px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }} 
      />

      <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={6} sx={{ padding: '3rem', borderRadius: '20px', backgroundColor: '#f7f7f7', boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)' }}>
          <Fade in={true} timeout={1000}>
            <Box>
              <Typography variant="h4" align="center" sx={{ fontWeight: '800', color: '#333', mb: 4 }}>
                Explora Lugares Increíbles
              </Typography>

              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                  <CircularProgress size={60} sx={{ color: '#ff6f61' }} />
                </Box>
              ) : (
                <Grid container spacing={4}>
                  <Tarjetas places={filteredPlaces} />
                </Grid>
              )}
            </Box>
          </Fade>
          <Divider sx={{ my: 4 }} />
          <Typography variant="body2" color="text.secondary" align="center">
            ¡Encuentra tu próximo destino con nosotros!
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default LugaresPage;
