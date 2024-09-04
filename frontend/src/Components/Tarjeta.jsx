import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';

export default function Tarjetas({ places }) {
  const navigate = useNavigate();

  const handleCardClick = (placeId) => {
    navigate(`/place/${placeId}`);
  };

  const handleShareClick = (place) => {
    if (navigator.share) {
      navigator.share({
        title: place.name,
        text: place.description,
        url: window.location.origin + `/place/${place.place_id}`,
      })
        .then(() => console.log('Compartido con éxito'))
        .catch((error) => console.error('Error al compartir', error));
    } else {
      alert('El compartir no es soportado por tu navegador.');
    }
  };

  return (
    <Grid container spacing={2}>
      {places.map((place) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={place.place_id}>
          <Card sx={{ maxWidth: 345 }} style={{ cursor: 'pointer' }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="place">
                  {place.name.charAt(0)}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={place.name}
              subheader={place.location}
            />
            <CardMedia
              component="img"
              height="194"
              image={place.images && place.images.length > 0 ? place.images[0].url : 'https://via.placeholder.com/194'}
              alt={place.name}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {place.description}
              </Typography>
              <Rating
                name={`rating-${place.place_id}`}
                value={place.average_rating}
                precision={0.5}
                readOnly
              />
            </CardContent>
            <CardActions disableSpacing>
              <Button
                size="small"
                color="primary"
                onClick={() => handleCardClick(place.place_id)}
              >
                Ver más
              </Button>
              <IconButton aria-label="share" onClick={() => handleShareClick(place)}>
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
