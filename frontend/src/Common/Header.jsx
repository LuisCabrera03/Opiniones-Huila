import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';

const pages = ['Mis Reseñas', 'Perfil'];
const settings = ['Perfil', '', 'Dashboard', 'Cerrar Sesión'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(!!localStorage.getItem('authToken'));
  const [categories, setCategories] = React.useState([]);
  const userName = localStorage.getItem('userName') || 'User';
  const userRole = localStorage.getItem('role') || '1'; // Obtener el rol del usuario, por defecto '1'
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://resenas-backend-20b57109bfac.herokuapp.com/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
    }
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleMenuItemClick = (setting) => {
    if (setting === 'Cerrar Sesión') {
      handleLogout();
    } else {
      navigate(`/${setting.toLowerCase().replace(' ', '-')}`);
    }
    handleCloseUserMenu();
  };

  const handleNavMenuClick = (page) => {
    if (page === 'Mis Reseñas') {
      navigate('/mis-reseñas');
    } else if (page === 'Lugares') {
      navigate('/lugares');
    } else if (page === 'Perfil') {
      navigate('/perfil');
    }
    handleCloseNavMenu();
  };

  const handleCategorySelect = (categoryId) => {
    navigate(`/lugares?category=${categoryId}`);
    handleCloseNavMenu();
  };

  const getInitials = (name) => {
    return name.charAt(0).toUpperCase();
  };

  const stringToColor = (string) => {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += ('00' + value.toString(16)).substr(-2);
    }

    return color;
  };

  const isHomePage = location.pathname === '/';

  return (
    <AppBar
      position="absolute"
      sx={{
        backgroundColor: isHomePage ? 'transparent' : '#282C34',  // Aplica un color específico
        boxShadow: isHomePage ? 'none' : '0px 4px 10px rgba(0, 0, 0, 0.2)',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease-in-out',
        zIndex: 10,
        '&:hover': {
          boxShadow: isHomePage ? 'none' : '0px 4px 10px rgba(0, 0, 0, 0.3)',
        },
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar disableGutters>
          <LocationOnIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Reseñas Huila
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleNavMenuClick(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
              <MenuItem>
                <Typography textAlign="center">Categorías</Typography>
                <Menu
                  anchorEl={anchorElNav}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                >
                  {categories.map((category) => (
                    <MenuItem
                      key={category.category_id}
                      onClick={() => handleCategorySelect(category.category_id)}
                    >
                      <Typography textAlign="center">{category.name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </MenuItem>
            </Menu>
          </Box>
          <LocationOnIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Reseñas Huila
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavMenuClick(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
            <Button
              onClick={handleOpenNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Lugares
            </Button>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {categories.map((category) => (
                <MenuItem
                  key={category.category_id}
                  onClick={() => handleCategorySelect(category.category_id)}
                >
                  <Typography textAlign="center">{category.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {!isLoggedIn ? (
              <Button color="inherit" onClick={handleLoginClick}>
                Iniciar Sesión
              </Button>
            ) : (
              <>
                <Tooltip title="Configuración">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      sx={{
                        bgcolor: stringToColor(userName),
                        color: 'white',
                        width: 40,
                        height: 40,
                        fontSize: 20,
                      }}
                    >
                      {getInitials(userName)}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings
                    .filter((setting) => setting !== 'Dashboard' || userRole === '2') // Mostrar Dashboard solo si el rol es 2 (Administrador)
                    .map((setting) => (
                      <MenuItem key={setting} onClick={() => handleMenuItemClick(setting)}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}

export default ResponsiveAppBar;
