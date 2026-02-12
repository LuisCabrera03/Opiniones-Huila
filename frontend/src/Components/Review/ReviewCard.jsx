import React from 'react';
import PropTypes from 'prop-types';
import { ThumbUp, Verified } from '@mui/icons-material';
import Card from '../UI/Card';
import Rating from '../UI/Rating';
import { formatRelativeDate, truncateText } from '../../utils/helpers';
import './ReviewCard.css';

const ReviewCard = ({
  review,
  user,
  place,
  showPlace = false,
  maxCommentLength = 200,
  className = '',
  ...props
}) => {
  if (!review) {
    return null;
  }

  const {
    rating,
    title,
    comment,
    pros = [],
    cons = [],
    createdAt,
    helpful,
    verified
  } = review;

  return (
    <Card
      className={`review-card ${className}`}
      elevation={1}
      padding="lg"
      {...props}
    >
      <div className="review-card__header">
        <div className="review-card__user-info">
          {user && (
            <>
              <img
                src={user.avatar}
                alt={user.name}
                className="review-card__avatar"
              />
              <div className="review-card__user-details">
                <div className="review-card__user-name">
                  {user.name}
                  {verified && (
                    <Verified className="review-card__verified-icon" />
                  )}
                </div>
                <div className="review-card__date">
                  {formatRelativeDate(createdAt)}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="review-card__rating-section">
          <Rating
            value={rating}
            size="small"
            readOnly
            showValue
          />
        </div>
      </div>

      {showPlace && place && (
        <div className="review-card__place-info">
          <span className="review-card__place-name">{place.name}</span>
          <span className="review-card__place-location">{place.location}</span>
        </div>
      )}

      {title && (
        <h4 className="review-card__title">{title}</h4>
      )}

      {comment && (
        <p className="review-card__comment">
          {truncateText(comment, maxCommentLength)}
        </p>
      )}

      {(pros.length > 0 || cons.length > 0) && (
        <div className="review-card__pros-cons">
          {pros.length > 0 && (
            <div className="review-card__pros">
              <span className="review-card__pros-title">Lo bueno:</span>
              <ul className="review-card__pros-list">
                {pros.map((pro, index) => (
                  <li key={index} className="review-card__pro-item">
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {cons.length > 0 && (
            <div className="review-card__cons">
              <span className="review-card__cons-title">Lo malo:</span>
              <ul className="review-card__cons-list">
                {cons.map((con, index) => (
                  <li key={index} className="review-card__con-item">
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="review-card__footer">
        <div className="review-card__helpful">
          <ThumbUp className="review-card__helpful-icon" />
          <span className="review-card__helpful-text">
            {helpful} personas encontraron esto útil
          </span>
        </div>
      </div>
    </Card>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.shape({
    rating: PropTypes.number.isRequired,
    title: PropTypes.string,
    comment: PropTypes.string,
    pros: PropTypes.arrayOf(PropTypes.string),
    cons: PropTypes.arrayOf(PropTypes.string),
    createdAt: PropTypes.string.isRequired,
    helpful: PropTypes.number,
    verified: PropTypes.bool
  }).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string
  }),
  place: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired
  }),
  showPlace: PropTypes.bool,
  maxCommentLength: PropTypes.number,
  className: PropTypes.string
};

export default ReviewCard;