import { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Tarjetas from './Tarjeta';
import Divider from '@mui/material/Divider';
import { Slide, Fade } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ParkIcon from '@mui/icons-material/Park';
import MuseumIcon from '@mui/icons-material/Museum';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalBarIcon from '@mui/icons-material/LocalBar';

// Diccionario de íconos de categoría
const categoryIcons = {
  Restaurante: <RestaurantIcon sx={{ fontSize: 40, color: '#FF7043', mr: 2 }} />,
  Parque: <ParkIcon sx={{ fontSize: 40, color: '#66BB6A', mr: 2 }} />,
  Museo: <MuseumIcon sx={{ fontSize: 40, color: '#42A5F5', mr: 2 }} />,
  Hotel: <HotelIcon sx={{ fontSize: 40, color: '#AB47BC', mr: 2 }} />,
  Bar: <LocalBarIcon sx={{ fontSize: 40, color: '#EF5350', mr: 2 }} />,
};

export default function LugaresPorCategoria() {
  const [categoriesWithPlaces, setCategoriesWithPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlacesGroupedByCategory = async () => {
      try {
        const response = await axios.get(' https://resenas-backend-20b57109bfac.herokuapp.com/api/places/grouped-by-category');
        const filteredCategories = response.data.filter(category => category.places && category.places.length > 0);
        setCategoriesWithPlaces(filteredCategories);
      } catch (error) {
        console.error('Error fetching places grouped by category', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlacesGroupedByCategory();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          color: '#1A237E',
          textAlign: 'center',
          mb: 6,
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
        }}
      >
        Explora los Destinos Más Exclusivos
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress size={60} />
        </Box>
      ) : categoriesWithPlaces.length === 0 ? (
        <Typography variant="h6" sx={{ color: '#757575', textAlign: 'center', mt: 4, fontFamily: 'Lato, sans-serif' }}>
          No se encontraron lugares disponibles en este momento.
        </Typography>
      ) : (
        categoriesWithPlaces.map((category, index) => (
          <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={1000 * (index + 1)} key={category.category_id}>
            <Box sx={{ mb: 8 }}>
              <Divider sx={{ my: 4, borderColor: '#1A237E' }} />
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {categoryIcons[category.name]}
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontFamily: 'Lato, sans-serif',
                    fontWeight: 600,
                    color: '#283593',
                    textTransform: 'uppercase',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                    display: 'inline-block',
                    position: 'relative',
                  }}
                >
                  {category.name}
                  <Box
                    component="span"
                    sx={{
                      position: 'absolute',
                      left: '0',
                      bottom: '-4px',
                      height: '4px',
                      width: '100%',
                      bgcolor: '#303F9F',
                      borderRadius: '2px',
                    }}
                  />
                </Typography>
              </Box>
              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  color: '#455A64',
                  fontStyle: 'italic',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '1.1rem',
                }}
              >
                Descubre los lugares más populares en la categoría de {category.name.toLowerCase()}. ¡No te lo pierdas!
              </Typography>
              <Fade in={true} timeout={1000 * (index + 1)}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'stretch' }}>
                  <Tarjetas places={category.places} />
                </Box>
              </Fade>
            </Box>
          </Slide>
        ))
      )}
    </Container>
  );
}
