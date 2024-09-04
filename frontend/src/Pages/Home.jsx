import 'react';
import Header from '../Common/Header';
import TopRatedPlaces from '../Components/TopRatedPlaces';
import PlacesByCategory from '../Components/PlacesByCategory';
import { Container, Typography, Box, Grid, Fade, Slide } from '@mui/material';
import LandscapeIcon from '@mui/icons-material/Landscape';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';

function Home() {
  return (
    <div>
      <Header />
      <div className='img-fluid'>
        <h1>La Plata</h1>
        <h2>Huila</h2>
      </div>

      {/* Contenido adicional sobre La Plata, Huila y animaciones */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Fade in={true} timeout={1500}>
          <Box sx={{ mb: 6 }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#2E7D32', textAlign: 'center' }}>
              Bienvenido a La Plata, Huila
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#616161', textAlign: 'center', mb: 4 }}>
              La Plata es un hermoso municipio en el departamento del Huila, conocido por su riqueza cultural, paisajes naturales impresionantes y la calidez de su gente. Aquí podrás descubrir los mejores lugares para visitar, disfrutar de la gastronomía local y sumergirte en la cultura huilense.
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} sm={4}>
                <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={1000}>
                  <Box sx={{ textAlign: 'center' }}>
                    <LandscapeIcon sx={{ fontSize: 60, color: '#FF7043' }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
                      Paisajes Naturales
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#757575' }}>
                      Explora la belleza natural de La Plata, rodeada de montañas, ríos y una biodiversidad única en la región.
                    </Typography>
                  </Box>
                </Slide>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={1500}>
                  <Box sx={{ textAlign: 'center' }}>
                    <LocalActivityIcon sx={{ fontSize: 60, color: '#42A5F5' }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
                      Actividades Culturales
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#757575' }}>
                      Sumérgete en la cultura local participando en eventos y festivales que muestran lo mejor de nuestra región.
                    </Typography>
                  </Box>
                </Slide>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={2000}>
                  <Box sx={{ textAlign: 'center' }}>
                    <NaturePeopleIcon sx={{ fontSize: 60, color: '#66BB6A' }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
                      Ecoturismo
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#757575' }}>
                      Disfruta de la naturaleza en su máximo esplendor con actividades de ecoturismo diseñadas para toda la familia.
                    </Typography>
                  </Box>
                </Slide>
              </Grid>
            </Grid>
          </Box>
        </Fade>

        {/* Tarjetas de lugares mejor calificados */}
        <Fade in={true} timeout={2000}>
          <Box sx={{ mb: 6 }}>
            <TopRatedPlaces />
          </Box>
        </Fade>

        {/* Tarjetas de lugares por categoría */}
        <Fade in={true} timeout={2500}>
          <Box sx={{ mb: 6 }}>
            <PlacesByCategory />
          </Box>
        </Fade>
      </Container>
    </div>
  );
}

export default Home;
