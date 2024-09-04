import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Divider, CircularProgress } from '@mui/material';
import axios from 'axios';

const MisReseñas = () => {
  const [reseñas, setReseñas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    console.log('userId:', userId); // Añade este log para verificar si el userId se está obteniendo correctamente

    if (!userId) {
      setError('No se encontró el ID del usuario.');
      setLoading(false);
      return;
    }

    const fetchReseñas = async () => {
      try {
        const response = await axios.get(`https://resenas-backend-20b57109bfac.herokuapp.com/api/users/${userId}/reseñas`);

        console.log('API response:', response.data); // Añade este log para ver qué datos devuelve la API
        
        if (response.status === 200 && Array.isArray(response.data)) {
          setReseñas(response.data);
        } else {
          setReseñas([]);
        }
      } catch (err) {
        console.error('Error fetching reviews:', err); // Añade este log para ver el error completo
        if (err.response && err.response.status === 404) {
          setError('No se encontraron reseñas para este usuario.');
        } else {
          setError('Error al cargar las reseñas.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReseñas();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (reseñas.length === 0) {
    return <Typography variant="h6">No se encontraron reseñas.</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Mis Reseñas
      </Typography>
      <List>
        {reseñas.map((reseña) => (
          <React.Fragment key={reseña.review_id}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={reseña.Place?.name || 'Lugar no disponible'}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="textPrimary">
                      {`Calificación: ${reseña.rating}/5`}
                    </Typography>
                    <br />
                    {reseña.comment}
                  </>
                }
              />
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
};

export default MisReseñas;
