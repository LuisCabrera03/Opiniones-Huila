// Constantes de la aplicación
export const APP_CONFIG = {
  NAME: 'Opiniones Huila',
  VERSION: '2.0.0',
  DESCRIPTION: 'Plataforma de reseñas y opiniones para lugares en el Huila',
  DEFAULT_LOCATION: 'Neiva, Huila'
};

// Configuración de ratings
export const RATING_CONFIG = {
  MIN: 1,
  MAX: 5,
  DEFAULT: 1,
  LABELS: {
    1: 'Muy malo',
    2: 'Malo',
    3: 'Regular',
    4: 'Bueno',
    5: 'Excelente'
  }
};

// Estados de carga
export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
};

// Rutas de la aplicación
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PLACES: '/places',
  PLACE_DETAILS: '/place',
  USERS: '/users',
  MY_REVIEWS: '/mis-reseñas',
  LUGARES: '/lugares'
};

// Configuración de paginación
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  LARGE_PAGE_SIZE: 24,
  SMALL_PAGE_SIZE: 6
};

// Configuración de búsqueda
export const SEARCH_CONFIG = {
  MIN_QUERY_LENGTH: 2,
  DEBOUNCE_DELAY: 300
};

// Configuración de imágenes
export const IMAGE_CONFIG = {
  DEFAULT_PLACE_IMAGE: '/images/default-place.jpg',
  DEFAULT_USER_AVATAR: '/images/default-avatar.jpg',
  PLACEHOLDER: '/images/placeholder.jpg'
};

// Configuración de validación
export const VALIDATION = {
  REVIEW: {
    MIN_TITLE_LENGTH: 5,
    MAX_TITLE_LENGTH: 100,
    MIN_COMMENT_LENGTH: 10,
    MAX_COMMENT_LENGTH: 1000
  },
  PLACE: {
    MIN_NAME_LENGTH: 3,
    MAX_NAME_LENGTH: 100,
    MIN_DESCRIPTION_LENGTH: 10,
    MAX_DESCRIPTION_LENGTH: 500
  }
};

// Configuración de colores del tema
export const THEME_COLORS = {
  PRIMARY: '#1976d2',
  SECONDARY: '#dc004e',
  SUCCESS: '#4caf50',
  WARNING: '#ff9800',
  ERROR: '#f44336',
  INFO: '#2196f3'
};

// Configuración de animaciones
export const ANIMATION_CONFIG = {
  DURATION: {
    SHORT: 200,
    MEDIUM: 300,
    LONG: 500
  },
  EASING: {
    EASE_IN: 'easeIn',
    EASE_OUT: 'easeOut',
    EASE_IN_OUT: 'easeInOut'
  }
};