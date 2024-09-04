import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Button, Snackbar, Alert } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import AddPlaceDialog from '../Components/AddPlaceDialog';
import EditPlaceDialog from '../Components/EditPlaceDialog';

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get('https://resenas-backend-20b57109bfac.herokuapp.com/api/places');
        setPlaces(response.data);
      } catch (error) {
        console.error('Error fetching places:', error);
        setSnackbar({ open: true, message: 'Error al cargar los lugares', severity: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  const handleAddPlace = (newPlace) => {
    setPlaces((prevPlaces) => [...prevPlaces, newPlace]);
    setSnackbar({ open: true, message: 'Lugar agregado con éxito', severity: 'success' });
  };

  const handleEditPlace = (updatedPlace) => {
    setPlaces((prevPlaces) =>
      prevPlaces.map((place) =>
        place.place_id === updatedPlace.place_id ? updatedPlace : place
      )
    );
    setSnackbar({ open: true, message: 'Lugar actualizado con éxito', severity: 'success' });
  };

  const handleEdit = (row) => {
    setSelectedPlaceId(row.place_id);
    setEditDialogOpen(true);
  };

  const handleDelete = async (row) => {
    try {
      await axios.delete(`https://resenas-backend-20b57109bfac.herokuapp.com/api/places/${row.place_id}`);
      setPlaces((prevPlaces) => prevPlaces.filter((place) => place.place_id !== row.place_id));
      setSnackbar({ open: true, message: 'Lugar eliminado con éxito', severity: 'success' });
    } catch (error) {
      console.error('Error deleting place:', error);
      setSnackbar({ open: true, message: 'Error al eliminar el lugar', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const columns = [
    { field: 'name', headerName: 'Nombre', width: 200 },
    { field: 'description', headerName: 'Descripción', width: 300 },
    { field: 'location', headerName: 'Ubicación', width: 250 },
    { field: 'average_rating', headerName: 'Calificación', width: 150 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <>
          <Button
            aria-label="edit"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => handleEdit(params.row)}
          >
            Editar
          </Button>
          <Button
            aria-label="delete"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(params.row)}
          >
            Eliminar
          </Button>
        </>
      ),
    },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Lugares
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={() => setAddDialogOpen(true)}>
            Agregar Lugar
          </Button>
        </Grid>
        <Grid item xs={12}>
          {loading ? (
            <Typography variant="h6">Cargando lugares...</Typography>
          ) : (
            <DataGrid
              rows={places}
              columns={columns}
              getRowId={(row) => row.place_id}
              autoHeight
              pageSize={10}
            />
          )}
        </Grid>
      </Grid>

      <AddPlaceDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onPlaceAdded={handleAddPlace}
      />

      <EditPlaceDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        placeId={selectedPlaceId}
        onPlaceUpdated={handleEditPlace}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
