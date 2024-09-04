import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from '@mui/material';
import axios from 'axios';

export default function AddPlaceDialog({ open, onClose, onPlaceAdded }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [averageRating, setAverageRating] = useState(0);
  const [imageUrl, setImageUrl] = useState(''); // Campo para la URL de la imagen
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://resenas-backend-20b57109bfac.herokuapp.com/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
    }
  };

  const handleAddPlace = async () => {
    try {
      const newPlace = {
        name,
        description,
        location,
        category_id: categoryId,
        average_rating: averageRating,
        images: [{ url: imageUrl }] // Incluir la URL de la imagen en el objeto a enviar
      };

      const response = await axios.post('https://resenas-backend-20b57109bfac.herokuapp.com/api/places', newPlace);

      onPlaceAdded(response.data); // Llamar a la función para actualizar la lista de lugares
      onClose(); // Cerrar el diálogo
    } catch (error) {
      console.error('Error al agregar el lugar:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Agregar un Nuevo Lugar</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Nombre"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Descripción"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Ubicación"
          type="text"
          fullWidth
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <TextField
          select
          margin="dense"
          label="Categoría"
          fullWidth
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          {categories.map((category) => (
            <MenuItem key={category.category_id} value={category.category_id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="dense"
          label="Calificación Promedio"
          type="number"
          fullWidth
          value={averageRating}
          onChange={(e) => setAverageRating(e.target.value)}
        />
        <TextField
          margin="dense"
          label="URL de la Imagen"
          type="text"
          fullWidth
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleAddPlace} color="primary">
          Agregar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
