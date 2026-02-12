import { useState, useEffect } from 'react';
import dataService from '../services/dataService';

// Hook personalizado para manejar datos de lugares
export const usePlaces = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        const data = await dataService.getPlaces();
        setPlaces(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  const searchPlaces = async (query) => {
    try {
      setLoading(true);
      const data = await dataService.searchPlaces(query);
      setPlaces(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { places, loading, error, searchPlaces };
};

// Hook para un lugar específico
export const usePlace = (placeId) => {
  const [place, setPlace] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaceData = async () => {
      if (!placeId) return;

      try {
        setLoading(true);
        const [placeData, reviewsData, statsData] = await Promise.all([
          dataService.getPlaceById(placeId),
          dataService.getReviewsByPlaceId(placeId),
          dataService.getPlaceStatistics(placeId)
        ]);

        setPlace(placeData);
        setReviews(reviewsData);
        setStatistics(statsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaceData();
  }, [placeId]);

  return { place, reviews, statistics, loading, error };
};

// Hook para categorías
export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await dataService.getCategories();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

// Hook para reseñas de usuario
export const useUserReviews = (userId) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserReviews = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        const data = await dataService.getReviewsByUserId(userId);
        setReviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserReviews();
  }, [userId]);

  const addReview = async (reviewData) => {
    try {
      const newReview = await dataService.addReview({
        ...reviewData,
        userId
      });
      setReviews(prev => [newReview, ...prev]);
      return newReview;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { reviews, loading, error, addReview };
};

// Hook para estadísticas generales
export const useStatistics = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        const data = await dataService.getOverallStatistics();
        setStatistics(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  return { statistics, loading, error };
};