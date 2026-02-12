// Funciones de utilidad
import { RATING_CONFIG, IMAGE_CONFIG } from './constants';

// Formatear fecha
export const formatDate = (dateString, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const date = new Date(dateString);
  return date.toLocaleDateString('es-CO', { ...defaultOptions, ...options });
};

// Formatear fecha relativa (hace X tiempo)
export const formatRelativeDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMilliseconds = now - date;
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return 'Hoy';
  } else if (diffInDays === 1) {
    return 'Ayer';
  } else if (diffInDays < 7) {
    return `Hace ${diffInDays} días`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `Hace ${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `Hace ${months} ${months === 1 ? 'mes' : 'meses'}`;
  } else {
    const years = Math.floor(diffInDays / 365);
    return `Hace ${years} ${years === 1 ? 'año' : 'años'}`;
  }
};

// Formatear rating
export const formatRating = (rating, decimals = 1) => {
  return Number(rating).toFixed(decimals);
};

// Obtener etiqueta de rating
export const getRatingLabel = (rating) => {
  return RATING_CONFIG.LABELS[Math.round(rating)] || 'Sin calificar';
};

// Formatear número con separadores de miles
export const formatNumber = (num) => {
  return num.toLocaleString('es-CO');
};

// Truncar texto
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

// Validar email
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Generar ID único
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Obtener imagen con fallback
export const getImageWithFallback = (imageSrc, fallback = IMAGE_CONFIG.PLACEHOLDER) => {
  return imageSrc || fallback;
};

// Calcular porcentaje
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

// Debounce para búsquedas
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Validar rating
export const validateRating = (rating) => {
  return rating >= RATING_CONFIG.MIN && rating <= RATING_CONFIG.MAX;
};

// Ordenar por rating
export const sortByRating = (items, ascending = false) => {
  return [...items].sort((a, b) => {
    return ascending ? a.rating - b.rating : b.rating - a.rating;
  });
};

// Ordenar por fecha
export const sortByDate = (items, dateField = 'createdAt', ascending = false) => {
  return [...items].sort((a, b) => {
    const dateA = new Date(a[dateField]);
    const dateB = new Date(b[dateField]);
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

// Filtrar por rating mínimo
export const filterByMinRating = (items, minRating) => {
  return items.filter(item => item.rating >= minRating);
};

// Agrupar por categoría
export const groupByCategory = (items) => {
  return items.reduce((groups, item) => {
    const category = item.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {});
};

// Calcular distribución de ratings
export const calculateRatingDistribution = (reviews) => {
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  const total = reviews.length;

  reviews.forEach(review => {
    if (distribution[review.rating] !== undefined) {
      distribution[review.rating]++;
    }
  });

  // Convertir a porcentajes
  Object.keys(distribution).forEach(rating => {
    distribution[rating] = calculatePercentage(distribution[rating], total);
  });

  return distribution;
};

// Buscar en array de objetos
export const searchInObjects = (items, query, fields) => {
  const lowercaseQuery = query.toLowerCase();
  return items.filter(item =>
    fields.some(field => {
      const value = item[field];
      return value && value.toString().toLowerCase().includes(lowercaseQuery);
    })
  );
};