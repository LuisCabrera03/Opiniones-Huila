import React from 'react';
import { Paper, Typography, List, ListItem, ListItemIcon, Checkbox } from '@mui/material';

const tasks = [
  { label: 'Revisar nuevas reseñas', completed: false },
  { label: 'Actualizar base de datos de usuarios', completed: true },
  { label: 'Mejorar algoritmo de recomendaciones', completed: false },
];

export default function TasksSection() {
  return (
    <Paper elevation={3} sx={{ padding: '1.5rem', marginTop: '2rem' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
        Tareas Pendientes
      </Typography>
      <List>
        {tasks.map((task, index) => (
          <ListItem key={index} disableGutters>
            <ListItemIcon>
              <Checkbox edge="start" checked={task.completed} disableRipple />
            </ListItemIcon>
            <Typography variant="body1">{task.label}</Typography>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
