import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
import Header from '../Common/Header';
import ReviewForm from '../Components/ReviewForm';

const labels = {
  0.5: 'Muy Malo',
  1: 'Malo',
  1.5: 'Pobre',
  2: 'Aceptable',
  2.5: 'Regular',
  3: 'Bueno',
  3.5: 'Muy Bueno',
  4: 'Excelente',
  4.5: 'Sobresaliente',
  5: 'Perfecto',
};

export default function PlaceDetails() {
  const { placeId } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const response = await axios.get(`https://resenas-backend-20b57109bfac.herokuapp.com/api/places/${placeId}`);
        setPlace(response.data);
      } catch (error) {
        console.error("Error fetching place details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaceDetails();
  }, [placeId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', backgroundColor: '#f0f4f8' }}>
        <CircularProgress size={60} sx={{ color: '#3f51b5' }} />
      </Box>
    );
  }

  if (!place) {
    return (
      <Container>
        <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>
          No se encontró información sobre este lugar.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
      {/* Aquí pasas el color de fondo deseado para el Header */}
      <Header headerColor="linear-gradient(90deg, #ff8a00, #e52e71)" />
      <Paper elevation={3} sx={{ padding: '2rem', borderRadius: '12px', backgroundColor: '#ffffff', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
        <Fade in={true} timeout={1000}>
          <Box>
            <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: '700', color: '#2c3e50', mb: 2 }}>
              {place.name}
            </Typography>
            <Typography variant="subtitle1" align="center" sx={{ color: '#7f8c8d', mb: 4 }}>
              {place.location}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
              <img
                src={place.images && place.images.length > 0 ? place.images[0].url : 'https://via.placeholder.com/800x400'}
                alt={place.name}
                style={{
                  maxWidth: '100%',
                  maxHeight: '400px',
                  width: 'auto',
                  height: 'auto',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
              />
            </Box>
            <Typography variant="body1" paragraph sx={{ color: '#34495e', lineHeight: 1.8, fontSize: '1.1rem' }}>
              {place.description}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
              <Typography variant="h6" sx={{ marginRight: '1rem', color: '#2c3e50', fontWeight: '600' }}>
                Calificación promedio:
              </Typography>
              <Rating value={place.average_rating} precision={0.5} readOnly sx={{ color: '#f1c40f', mr: 2 }} />
              {place.average_rating !== null && (
                <Typography variant="body2" sx={{ ml: 2 }}>
                  {labels[Math.round(place.average_rating * 2) / 2]}
                </Typography>
              )}
            </Box>
          </Box>
        </Fade>
        <Divider sx={{ my: 4 }} />

        <ReviewForm />

        <Fade in={true} timeout={1500}>
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: '700', color: '#2c3e50', mb: 3 }}>
              Reseñas
            </Typography>
            {place.reviews && place.reviews.length > 0 ? (
              place.reviews.map((review) => (
                <Box key={review.review_id} sx={{ mb: 3 }}>
                  <Paper elevation={2} sx={{ padding: '2rem', borderRadius: '12px', backgroundColor: '#ecf0f1', mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: '600', color: '#2c3e50' }}>
                      {review.user ? review.user.username : "Usuario desconocido"}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 2 }}>
                      <Rating value={review.rating} precision={0.5} readOnly sx={{ color: '#f39c12', mr: 2 }} />
                      <Typography variant="body2">
                        {labels[Math.round(review.rating * 2) / 2]}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#34495e', mb: 2 }}>
                      {review.comment}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                      Publicado el {new Date(review.created_at).toLocaleDateString()}
                    </Typography>
                  </Paper>
                </Box>
              ))
            ) : (
              <Typography variant="body2" align="center" sx={{ color: '#7f8c8d' }}>
                No hay reseñas disponibles.
              </Typography>
            )}
          </Box>
        </Fade>
      </Paper>
    </Container>
  );
}
