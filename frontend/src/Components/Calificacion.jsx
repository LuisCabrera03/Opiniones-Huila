import { useState, useEffect } from 'react'; // Mantén la importación de useEffect
import PropTypes from 'prop-types';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function HoverRating({ placeId, initialRating }) {
  const [value, setValue] = useState(initialRating);
  const [hover, setHover] = useState(-1);

  // Use useEffect if you need to perform a side effect
  useEffect(() => {
    // Any code that needs to run after the component mounts or updates
    // For example, you might want to fetch the initial rating from the server
    console.log('Component mounted or updated');
  }, [value]); // This effect will run whenever 'value' changes

  const handleRatingChange = async (event, newValue) => {
    setValue(newValue);
    try {
      await axios.post(` https://resenas-backend-20b57109bfac.herokuapp.com/api/places/${placeId}/rating`, {
        rating: newValue
      });
      console.log('Rating updated successfully');
    } catch (error) {
      console.error('Error updating rating', error);
    }
  };

  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={handleRatingChange}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}

HoverRating.propTypes = {
  placeId: PropTypes.number.isRequired,
  initialRating: PropTypes.number.isRequired,
};
