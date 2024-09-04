import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const news = [
  { title: 'Nueva función de análisis de reseñas', date: 'Hace 2 días' },
  { title: 'Mejora en la interfaz de usuario', date: 'Hace 1 semana' },
  { title: 'Actualización de seguridad implementada', date: 'Hace 1 mes' },
];

export default function NewsSection() {
  return (
    <Paper elevation={3} sx={{ padding: '1.5rem', marginTop: '2rem' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
        Noticias
      </Typography>
      <List>
        {news.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item.title} secondary={item.date} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
