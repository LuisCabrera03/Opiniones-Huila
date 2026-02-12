import React from 'react';
import Header from '../Common/Header';
import { Mountain, Calendar, Users } from 'lucide-react';

// Import new components and hooks
import { usePlaces, useCategories, useStatistics } from '../hooks/useData';
import { LoadingSpinner } from '../components/ui';
import { Card } from '../components/ui';
import PlaceCard from '../Components/Place/PlaceCard';
import { PAGINATION } from '../utils/constants';

function Home() {
  const { places, loading: placesLoading } = usePlaces();
  const { categories, loading: categoriesLoading } = useCategories();
  const { statistics } = useStatistics();

  // Get top rated places
  const topRatedPlaces = places
    .sort((a, b) => b.rating - a.rating)
    .slice(0, PAGINATION.SMALL_PAGE_SIZE);

  if (placesLoading || categoriesLoading) {
    return <LoadingSpinner centered message="Cargando datos..." />;
  }

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

            {/* Statistics Section */}
            {statistics && (
              <Grid container spacing={3} justifyContent="center" sx={{ mb: 4 }}>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                      {statistics.totalPlaces}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lugares
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                      {statistics.totalReviews}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Reseñas
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            )}

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

        {/* Top Rated Places Section */}
        {topRatedPlaces.length > 0 && (
          <Fade in={true} timeout={2000}>
            <Box sx={{ mb: 6 }}>
              <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
                Lugares Mejor Calificados
              </Typography>
              <Grid container spacing={3}>
                {topRatedPlaces.map((place) => (
                  <Grid item xs={12} sm={6} md={4} key={place.id}>
                    <PlaceCard place={place} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Fade>
        )}

        {/* Categories Section */}
        {categories.length > 0 && (
          <Fade in={true} timeout={2500}>
            <Box sx={{ mb: 6 }}>
              <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
                Explorar por Categoría
              </Typography>
              <Grid container spacing={2}>
                {categories.slice(0, 8).map((category) => (
                  <Grid item xs={6} sm={3} md={2} key={category.id}>
                    <Box
                      sx={{
                        textAlign: 'center',
                        p: 2,
                        borderRadius: 2,
                        bgcolor: 'white',
                        boxShadow: 1,
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 3
                        }
                      }}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          backgroundColor: category.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 1,
                          color: 'white'
                        }}
                      >
                        <span className="material-icons">{category.icon}</span>
                      </Box>
                      <Typography variant="body2" fontWeight="medium">
                        {category.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {category.totalPlaces} lugares
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Fade>
        )}
      </Container>
    </div>
  );
}

export default Home;
