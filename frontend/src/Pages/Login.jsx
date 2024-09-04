import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
  Divider,
  Link,
  IconButton,
  InputAdornment,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [isGoogleLoggedIn, setIsGoogleLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alert, setAlert] = useState({ message: '', severity: '' });
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    return password.length >= minLength && hasUpperCase && hasNumber && hasSpecialChar;
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const token = response.credential;
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      const decodedToken = JSON.parse(jsonPayload);
      setEmail(decodedToken.email);

      const result = await axios.post('https://resenas-backend-20b57109bfac.herokuapp.com/api/auth/google', {
        token: response.credential,
      });

      if (result.data.isNewUser) {
        setShowPasswordField(true);
        setAlert({ message: 'Por favor, configure su contraseña para completar el registro.', severity: 'info' });
      } else {
        setIsGoogleLoggedIn(true);
        setAlert({ message: 'Inicio de sesión exitoso.', severity: 'success' });
        // Guardar el token, el user_id y el nombre en localStorage para persistir la sesión durante 7 días
        localStorage.setItem('authToken', result.data.token);
        localStorage.setItem('user_id', result.data.user_id);  // Asegúrate de que el backend envíe user_id correctamente
        localStorage.setItem('userName', result.data.name);
        // Redirigir a la página de inicio
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }

    } catch (error) {
      setAlert({ message: 'Error durante el inicio de sesión con Google.', severity: 'error' });
    }
  };

  const handleGoogleFailure = (error) => {
    setAlert({ message: 'Falló el inicio de sesión con Google.', severity: 'error' });
  };

  const handlePasswordSubmit = async () => {
    if (password !== confirmPassword) {
      setAlert({ message: 'Las contraseñas no coinciden.', severity: 'error' });
      return;
    }

    if (!validatePassword(password)) {
      setAlert({
        message: 'La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, un número y un carácter especial.',
        severity: 'error',
      });
      return;
    }

    try {
      const result = await axios.post('https://resenas-backend-20b57109bfac.herokuapp.com/api/auth/set-password', {
        email,
        password,
      });

      setAlert({ message: 'Contraseña configurada con éxito. Por favor, inicie sesión con su correo electrónico y contraseña.', severity: 'success' });
      
      // Guardar el token, el user_id y el nombre en localStorage para persistir la sesión durante 7 días
      localStorage.setItem('authToken', result.data.token);
      localStorage.setItem('user_id', result.data.user_id);  // Asegúrate de que el backend envíe user_id correctamente
      localStorage.setItem('userName', result.data.name);
      // Redirigir a la página de inicio
      setTimeout(() => {
        setIsGoogleLoggedIn(false);
        setShowPasswordField(false);
        setPassword('');
        setConfirmPassword('');
        navigate('/');
      }, 1000);
    } catch (error) {
      setAlert({ message: 'Error al configurar la contraseña.', severity: 'error' });
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('https://resenas-backend-20b57109bfac.herokuapp.com/api/auth/login', {
        email,
        password,
      });
  
      // Guardar el token, el user_id, el nombre y el rol en localStorage
      localStorage.setItem('authToken', result.data.token);
      localStorage.setItem('user_id', result.data.user_id);
      localStorage.setItem('userName', result.data.name);
      localStorage.setItem('role', result.data.role);
  
      setAlert({ message: 'Inicio de sesión exitoso.', severity: 'success' });
      setTimeout(() => {
        navigate('/');
      }, 1000);
  
    } catch (error) {
      setAlert({ message: 'Error al iniciar sesión. Por favor, verifica tus credenciales.', severity: 'error' });
    }
  };
  
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <GoogleOAuthProvider clientId="231998741255-mcsedq8rq7c6b43vgjhscm8uovkehcj5.apps.googleusercontent.com">
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://a0.muscache.com/im/pictures/aa0807da-59b0-4548-b8c5-e23e1c8585fd.jpg?im_w=720)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
          }}
        >
          <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h4" sx={{ fontWeight: 600 }}>
              Bienvenido de Nuevo
            </Typography>
            <Typography component="h2" variant="body2" sx={{ mt: 1, mb: 4 }}>
              Inicia sesión en tu cuenta para continuar
            </Typography>

            {/* Mostrar alertas */}
            {alert.message && (
              <Stack sx={{ width: '100%', mb: 2 }} spacing={2}>
                <Alert severity={alert.severity}>{alert.message}</Alert>
              </Stack>
            )}

            <Box component="form" noValidate sx={{ mt: 1, width: '100%' }} onSubmit={handleLoginSubmit}>
              {showPasswordField ? (
                <>
                  <Typography variant="h6">Configura una contraseña para tu cuenta</Typography>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                    InputProps={{
                      sx: {
                        borderRadius: '10px',
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={togglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirmar Contraseña"
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirm-password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    variant="outlined"
                    InputProps={{
                      sx: {
                        borderRadius: '10px',
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle confirm password visibility"
                            onClick={toggleConfirmPasswordVisibility}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      py: 1.5,
                      borderRadius: '10px',
                      backgroundColor: '#1976d2',
                      '&:hover': {
                        backgroundColor: '#1565c0',
                      },
                      fontWeight: 'bold',
                    }}
                    onClick={handlePasswordSubmit}
                  >
                    Guardar Contraseña
                  </Button>
                </>
              ) : (
                <>
                  {!isGoogleLoggedIn && (
                    <>
                      <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleFailure}
                        render={(renderProps) => (
                          <Button
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            fullWidth
                            variant="outlined"
                            startIcon={
                              <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                                alt="Google logo"
                                style={{ width: '20px', height: '20px' }}
                              />
                            }
                            sx={{
                              py: 1.5,
                              borderRadius: '10px',
                              fontWeight: 'bold',
                              textTransform: 'none',
                              borderColor: '#dbdbdb',
                              color: '#000',
                              '&:hover': {
                                borderColor: '#a0a0a0',
                              },
                            }}
                          >
                            Iniciar sesión con Google
                          </Button>
                        )}
                      />
                      <Divider sx={{ my: 3 }}>O</Divider>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Correo Electrónico"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        variant="outlined"
                        InputProps={{
                          sx: {
                            borderRadius: '10px',
                          },
                        }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        variant="outlined"
                        InputProps={{
                          sx: {
                            borderRadius: '10px',
                          },
                        }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                        <Link href="#" variant="body2" underline="hover">
                          ¿Olvidaste tu contraseña?
                        </Link>
                      </Box>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                          mt: 3,
                          mb: 2,
                          py: 1.5,
                          borderRadius: '10px',
                          backgroundColor: '#1976d2',
                          '&:hover': {
                            backgroundColor: '#1565c0',
                          },
                          fontWeight: 'bold',
                        }}
                      >
                        Iniciar Sesión
                      </Button>
                    </>
                  )}
                </>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </GoogleOAuthProvider>
  );
}

export default Login;
