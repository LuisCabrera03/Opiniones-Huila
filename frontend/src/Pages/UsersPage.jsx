import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Snackbar, Alert, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://resenas-backend-20b57109bfac.herokuapp.com/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setSnackbar({ open: true, message: 'Error al cargar los usuarios', severity: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`https://resenas-backend-20b57109bfac.herokuapp.com/api/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.user_id !== userId));
      setSnackbar({ open: true, message: 'Usuario eliminado con éxito', severity: 'success' });
    } catch (error) {
      console.error('Error deleting user:', error);
      setSnackbar({ open: true, message: 'Error al eliminar el usuario', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const columns = [
    { field: 'user_id', headerName: 'ID', width: 90 },
    { field: 'username', headerName: 'Nombre de usuario', width: 200 },
    { field: 'email', headerName: 'Correo electrónico', width: 250 },
    { field: 'role', headerName: 'Rol', width: 130 },
    { field: 'created_at', headerName: 'Fecha de creación', width: 180 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={() => handleDelete(params.row.user_id)}
        >
          Eliminar
        </Button>
      ),
    },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Usuarios
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {loading ? (
            <Typography variant="h6">Cargando usuarios...</Typography>
          ) : (
            <DataGrid
              rows={users}
              columns={columns}
              getRowId={(row) => row.user_id}
              autoHeight
              pageSize={10}
              rowsPerPageOptions={[10, 20, 50]}
              disableSelectionOnClick
            />
          )}
        </Grid>
      </Grid>

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
