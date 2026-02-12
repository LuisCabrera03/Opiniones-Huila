import { useAppContext } from '../context/AppContext';
import dataService from '../services/dataService';

// Hook personalizado para autenticación
export const useAuth = () => {
  const { state, setCurrentUser, logout: logoutAction, setError } = useAppContext();
  const { currentUser, isAuthenticated } = state;

  // Simular login (en una app real sería una llamada a API)
  const login = async (credentials) => {
    try {
      const { email, password } = credentials;

      // Buscar usuario por email
      const users = await dataService.getUsers();
      const user = users.find(u => u.email === email);

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      // En una app real, aquí validarías la contraseña
      // Por ahora, aceptamos cualquier contraseña
      setCurrentUser(user);

      return { success: true, user };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  // Simular registro
  const register = async (userData) => {
    try {
      const { name, email, password } = userData;

      // Verificar si el usuario ya existe
      const users = await dataService.getUsers();
      const existingUser = users.find(u => u.email === email);

      if (existingUser) {
        throw new Error('El usuario ya existe');
      }

      // Crear nuevo usuario
      const newUser = {
        id: `user${Date.now()}`,
        name,
        email,
        avatar: '/images/avatars/default.jpg',
        joinDate: new Date().toISOString(),
        totalReviews: 0,
        averageRating: 0,
        level: 'Nuevo Reseñador',
        verified: false,
        location: 'Neiva, Huila'
      };

      // En una app real, enviarías esto a la API
      setCurrentUser(newUser);

      return { success: true, user: newUser };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  // Logout
  const logout = () => {
    logoutAction();
  };

  // Login con Google (simulado)
  const loginWithGoogle = async (googleUser) => {
    try {
      const user = {
        id: `google_${googleUser.id}`,
        name: googleUser.name,
        email: googleUser.email,
        avatar: googleUser.picture,
        joinDate: new Date().toISOString(),
        totalReviews: 0,
        averageRating: 0,
        level: 'Nuevo Reseñador',
        verified: true,
        location: 'Neiva, Huila'
      };

      setCurrentUser(user);

      return { success: true, user };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  // Verificar si el usuario tiene permisos
  const hasPermission = (permission) => {
    if (!currentUser) return false;

    // Lógica de permisos básica
    switch (permission) {
      case 'write_review':
        return isAuthenticated;
      case 'edit_review':
        return isAuthenticated;
      case 'delete_review':
        return isAuthenticated;
      case 'admin':
        return currentUser.level === 'Admin';
      default:
        return false;
    }
  };

  // Actualizar perfil de usuario
  const updateProfile = async (profileData) => {
    try {
      if (!currentUser) {
        throw new Error('Usuario no autenticado');
      }

      const updatedUser = {
        ...currentUser,
        ...profileData,
        updatedAt: new Date().toISOString()
      };

      setCurrentUser(updatedUser);

      return { success: true, user: updatedUser };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  return {
    currentUser,
    isAuthenticated,
    login,
    register,
    logout,
    loginWithGoogle,
    hasPermission,
    updateProfile
  };
};