import { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Tarjetas from './Tarjeta';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function TopRatedPlaces() {
  const [topRatedPlaces, setTopRatedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopRatedPlaces = async () => {
      try {
        const response = await axios.get(' https://resenas-backend-20b57109bfac.herokuapp.com/api/places');
        const filteredPlaces = response.data.filter(place => place.average_rating >= 4 && place.average_rating <= 5);
        setTopRatedPlaces(filteredPlaces);
      } catch (error) {
        console.error("Error fetching the top rated places", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedPlaces();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5', textAlign: 'center' }}>
        Descubre los Mejores Destinos: ¡Lugares con 4 a 5 Estrellas!
      </Typography>


      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : topRatedPlaces.length === 0 ? (
        <Typography variant="h6" sx={{ color: '#757575', textAlign: 'center', mt: 4 }}>
          No hay lugares con calificación entre 4 y 5 estrellas.
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          <Tarjetas places={topRatedPlaces} />
        </Box>
      )}
    </Container>
  );
}
