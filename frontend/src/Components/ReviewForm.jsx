import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

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

export default function ReviewForm({ onReviewSubmit }) {
  const { placeId } = useParams();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(-1);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const userId = localStorage.getItem('user_id');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!userId) {
      setError('No se encontró el ID del usuario. Por favor, asegúrate de haber iniciado sesión.');
      return;
    }

    // Validación del rating
    if (rating <= 0 || rating > 5) {
      setError('La calificación debe estar entre 0.5 y 5.0.');
      return;
    }

    try {
      const response = await axios.post(` https://resenas-backend-20b57109bfac.herokuapp.com/api/places/${placeId}/reviews`, {
        user_id: userId,
        rating,
        comment,
      });

      if (onReviewSubmit) {
        onReviewSubmit(response.data);
      }
      setRating(0);
      setComment('');
      setSuccess('Reseña enviada con éxito.');
    } catch (error) {
      console.error("Error al crear la reseña:", error.message);
      setError('Error al crear la reseña. Por favor, inténtalo nuevamente.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        Deja tu reseña
      </Typography>
      {error && (
        <Stack sx={{ width: '100%', mb: 2 }} spacing={2}>
          <Alert severity="error">{error}</Alert>
        </Stack>
      )}
      {success && (
        <Stack sx={{ width: '100%', mb: 2 }} spacing={2}>
          <Alert severity="success">{success}</Alert>
        </Stack>
      )}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Rating
          name="rating"
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
          precision={0.5}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          sx={{ mr: 2 }}
        />
        {rating !== null && (
          <Typography variant="body2">{labels[hover !== -1 ? hover : rating]}</Typography>
        )}
      </Box>
      <TextField
        fullWidth
        variant="outlined"
        label="Comentario"
        multiline
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" type="submit">
        Enviar Reseña
      </Button>
    </Box>
  );
}
