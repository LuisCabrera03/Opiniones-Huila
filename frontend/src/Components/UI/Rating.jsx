import React from 'react';
import PropTypes from 'prop-types';
import { Star } from 'lucide-react';
import { formatRating, getRatingLabel } from '../../utils/helpers';
import { cn } from "../../lib/utils";

const Rating = ({
  value = 0,
  max = 5,
  size = 'medium',
  readOnly = true,
  showLabel = false,
  showValue = false,
  onChange,
  className = '',
  ...props
}) => {
  const handleStarClick = (rating) => {
    if (!readOnly && onChange) {
      onChange(rating);
    }
  };

  const handleKeyPress = (event, rating) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleStarClick(rating);
    }
  };

  const renderStars = () => {
    const stars = [];

    const sizeClasses = {
      small: 'w-4 h-4',
      medium: 'w-5 h-5',
      large: 'w-6 h-6'
    };

    for (let i = 1; i <= max; i++) {
      const isFilled = i <= value;

      stars.push(
        <button
          key={i}
          type="button"
          className={cn(
            "inline-flex items-center justify-center transition-all duration-200",
            !readOnly && "hover:scale-110 cursor-pointer",
            readOnly && "cursor-default"
          )}
          onClick={() => handleStarClick(i)}
          onKeyPress={(e) => handleKeyPress(e, i)}
          tabIndex={!readOnly ? 0 : -1}
          disabled={readOnly}
          aria-label={!readOnly ? `Calificar con ${i} estrellas` : undefined}
        >
          <Star
            className={cn(
              sizeClasses[size],
              "transition-colors duration-200",
              isFilled ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-400"
            )}
          />
        </button>
      );
    }

    return stars;
  };

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      <div className="flex items-center gap-1">
        {renderStars()}
      </div>

      {showValue && (
        <span className="text-sm font-semibold text-foreground">
          {formatRating(value)}
        </span>
      )}

      {showLabel && (
        <span className="text-xs text-muted-foreground font-medium">
          {getRatingLabel(value)}
        </span>
      )}
    </div>
  );
};

Rating.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  readOnly: PropTypes.bool,
  showLabel: PropTypes.bool,
  showValue: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string
};

export default Rating;