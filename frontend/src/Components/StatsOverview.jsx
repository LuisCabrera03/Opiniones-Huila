import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';
import CommentIcon from '@mui/icons-material/Comment';

const stats = [
  {
    icon: <StarIcon sx={{ color: '#ffca28', fontSize: '2rem' }} />,
    label: 'Calificación Promedio',
    value: '4.5/5',
  },
  {
    icon: <PeopleIcon sx={{ color: '#42a5f5', fontSize: '2rem' }} />,
    label: 'Nuevos Usuarios',
    value: '1,234',
  },
  {
    icon: <CommentIcon sx={{ color: '#66bb6a', fontSize: '2rem' }} />,
    label: 'Total de Reseñas',
    value: '12,345',
  },
];

export default function StatsOverview() {
  return (
    <Grid container spacing={3}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Paper elevation={3} sx={{ padding: '1.5rem', display: 'flex', alignItems: 'center' }}>
            <Box sx={{ mr: 2 }}>{stat.icon}</Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {stat.value}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {stat.label}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
