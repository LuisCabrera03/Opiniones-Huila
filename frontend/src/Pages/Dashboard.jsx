import React, { useState } from 'react';
import { Container, Grid, Typography, IconButton, Toolbar, AppBar, CssBaseline, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import StatsOverview from '../Components/StatsOverview';
import LineChart from '../Components/LineChart';
import PieChart from '../Components/PieChart';
import NewsSection from '../Components/NewsSection';
import TasksSection from '../Components/TasksSection';
import NavigationDrawer from '../Components/NavigationDrawer';

export default function Dashboard() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const userRole = localStorage.getItem('role');

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <NavigationDrawer open={drawerOpen} onClose={handleDrawerClose} userRole={userRole} />

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
          <Grid container spacing={3}>
            {/* Resumen de estadísticas */}
            <Grid item xs={12}>
              <StatsOverview />
            </Grid>

            {/* Gráfico de líneas */}
            <Grid item xs={12} md={8}>
              <LineChart />
            </Grid>

            {/* Gráfico circular */}
            <Grid item xs={12} md={4}>
              <PieChart />
            </Grid>

            {/* Noticias */}
            <Grid item xs={12} md={6}>
              <NewsSection />
            </Grid>

            {/* Tareas */}
            <Grid item xs={12} md={6}>
              <TasksSection />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
