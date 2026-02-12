import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { MapPin, Tag } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import Rating from '../ui/Rating';
import { formatNumber, getImageWithFallback } from '../../utils/helpers';
import { ROUTES } from '../../utils/constants';
import { cn } from '../../lib/utils';

const PlaceCard = ({
  place,
  showCategory = true,
  className = '',
  ...props
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${ROUTES.PLACE_DETAILS}/${place.id}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  if (!place) {
    return null;
  }

  const {
    id,
    name,
    category,
    description,
    location,
    rating,
    totalReviews,
    image
  } = place;

  return (
    <Card
      className={cn(
        "overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        "group",
        className
      )}
      elevation={1}
      hoverable
      padding="none"
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalles de ${name}`}
      {...props}
    >
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={getImageWithFallback(image)}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {showCategory && (
          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Tag className="w-3 h-3" />
            {category}
          </div>
        )}
      </div>

      {/* Content Section */}
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-lg text-foreground flex-1 line-clamp-2">
            {name}
          </h3>
          <div className="ml-2 flex-shrink-0">
            <Rating
              value={rating}
              size="small"
              readOnly
              showValue
            />
          </div>
        </div>

        <div className="flex items-center gap-1 mb-3 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{location}</span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="text-xs text-muted-foreground font-medium">
            {formatNumber(totalReviews)} reseñas
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

PlaceCard.propTypes = {
  place: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    totalReviews: PropTypes.number.isRequired,
    image: PropTypes.string
  }).isRequired,
  showCategory: PropTypes.bool,
  className: PropTypes.string
};

export default PlaceCard;