import React, { createContext, useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { LOADING_STATES } from '../utils/constants';

// Estado inicial
const initialState = {
  // UI State
  loading: LOADING_STATES.IDLE,
  error: null,

  // Data State
  places: [],
  reviews: [],
  users: [],
  categories: [],

  // User State
  currentUser: null,
  isAuthenticated: false,

  // Filters State
  searchQuery: '',
  selectedCategory: null,
  sortBy: 'rating',
  filterBy: {
    minRating: 0,
    maxRating: 5
  },

  // UI Preferences
  viewMode: 'grid', // 'grid' | 'list'
  theme: 'light' // 'light' | 'dark'
};

// Action types
export const ActionTypes = {
  // Loading actions
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',

  // Data actions
  SET_PLACES: 'SET_PLACES',
  SET_REVIEWS: 'SET_REVIEWS',
  SET_USERS: 'SET_USERS',
  SET_CATEGORIES: 'SET_CATEGORIES',

  // User actions
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  LOGOUT: 'LOGOUT',

  // Filter actions
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_SELECTED_CATEGORY: 'SET_SELECTED_CATEGORY',
  SET_SORT_BY: 'SET_SORT_BY',
  SET_FILTER_BY: 'SET_FILTER_BY',
  RESET_FILTERS: 'RESET_FILTERS',

  // UI actions
  SET_VIEW_MODE: 'SET_VIEW_MODE',
  SET_THEME: 'SET_THEME'
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: LOADING_STATES.ERROR
      };

    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    case ActionTypes.SET_PLACES:
      return {
        ...state,
        places: action.payload,
        loading: LOADING_STATES.SUCCESS
      };

    case ActionTypes.SET_REVIEWS:
      return {
        ...state,
        reviews: action.payload
      };

    case ActionTypes.SET_USERS:
      return {
        ...state,
        users: action.payload
      };

    case ActionTypes.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };

    case ActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: !!action.payload
      };

    case ActionTypes.LOGOUT:
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false
      };

    case ActionTypes.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload
      };

    case ActionTypes.SET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload
      };

    case ActionTypes.SET_SORT_BY:
      return {
        ...state,
        sortBy: action.payload
      };

    case ActionTypes.SET_FILTER_BY:
      return {
        ...state,
        filterBy: {
          ...state.filterBy,
          ...action.payload
        }
      };

    case ActionTypes.RESET_FILTERS:
      return {
        ...state,
        searchQuery: '',
        selectedCategory: null,
        sortBy: 'rating',
        filterBy: {
          minRating: 0,
          maxRating: 5
        }
      };

    case ActionTypes.SET_VIEW_MODE:
      return {
        ...state,
        viewMode: action.payload
      };

    case ActionTypes.SET_THEME:
      return {
        ...state,
        theme: action.payload
      };

    default:
      return state;
  }
};

// Context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedViewMode = localStorage.getItem('viewMode');
    const savedUser = localStorage.getItem('currentUser');

    if (savedTheme) {
      dispatch({ type: ActionTypes.SET_THEME, payload: savedTheme });
    }

    if (savedViewMode) {
      dispatch({ type: ActionTypes.SET_VIEW_MODE, payload: savedViewMode });
    }

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: ActionTypes.SET_CURRENT_USER, payload: user });
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('theme', state.theme);
  }, [state.theme]);

  useEffect(() => {
    localStorage.setItem('viewMode', state.viewMode);
  }, [state.viewMode]);

  useEffect(() => {
    if (state.currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [state.currentUser]);

  // Action creators
  const actions = {
    setLoading: (loading) => dispatch({ type: ActionTypes.SET_LOADING, payload: loading }),
    setError: (error) => dispatch({ type: ActionTypes.SET_ERROR, payload: error }),
    clearError: () => dispatch({ type: ActionTypes.CLEAR_ERROR }),

    setPlaces: (places) => dispatch({ type: ActionTypes.SET_PLACES, payload: places }),
    setReviews: (reviews) => dispatch({ type: ActionTypes.SET_REVIEWS, payload: reviews }),
    setUsers: (users) => dispatch({ type: ActionTypes.SET_USERS, payload: users }),
    setCategories: (categories) => dispatch({ type: ActionTypes.SET_CATEGORIES, payload: categories }),

    setCurrentUser: (user) => dispatch({ type: ActionTypes.SET_CURRENT_USER, payload: user }),
    logout: () => dispatch({ type: ActionTypes.LOGOUT }),

    setSearchQuery: (query) => dispatch({ type: ActionTypes.SET_SEARCH_QUERY, payload: query }),
    setSelectedCategory: (category) => dispatch({ type: ActionTypes.SET_SELECTED_CATEGORY, payload: category }),
    setSortBy: (sortBy) => dispatch({ type: ActionTypes.SET_SORT_BY, payload: sortBy }),
    setFilterBy: (filters) => dispatch({ type: ActionTypes.SET_FILTER_BY, payload: filters }),
    resetFilters: () => dispatch({ type: ActionTypes.RESET_FILTERS }),

    setViewMode: (viewMode) => dispatch({ type: ActionTypes.SET_VIEW_MODE, payload: viewMode }),
    setTheme: (theme) => dispatch({ type: ActionTypes.SET_THEME, payload: theme })
  };

  const value = {
    state,
    dispatch,
    ...actions
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// Hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }

  return context;
};

export default AppContext;