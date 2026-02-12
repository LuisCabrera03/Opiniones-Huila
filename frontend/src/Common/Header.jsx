import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, MapPin } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from '../lib/utils';
import { useCategories } from '../hooks/useData';

const pages = ['Mis Reseñas', 'Perfil'];
const settings = ['Perfil', '', 'Dashboard', 'Cerrar Sesión'];

function ResponsiveAppBar() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(!!localStorage.getItem('authToken'));
  const userName = localStorage.getItem('userName') || 'User';
  const userRole = localStorage.getItem('role') || '1';
  const navigate = useNavigate();
  const location = useLocation();
  const { categories } = useCategories();

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

  const handleNavClick = (page) => {
    if (page === 'Mis Reseñas') {
      navigate('/mis-reseñas');
    } else if (page === 'Lugares') {
      navigate('/lugares');
    } else if (page === 'Perfil') {
      navigate('/perfil');
    }
  };

  const handleMenuItemClick = (setting) => {
    if (setting === 'Cerrar Sesión') {
      handleLogout();
    } else if (setting === 'Dashboard') {
      navigate('/dashboard');
    } else {
      navigate(`/${setting.toLowerCase().replace(' ', '-')}`);
    }
  };

  const getInitials = (name) => {
    return name.charAt(0).toUpperCase();
  };

  const isHomePage = location.pathname === '/';

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isHomePage
          ? "bg-transparent shadow-none"
          : "bg-gray-900/95 backdrop-blur-sm shadow-lg"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <MapPin className="h-6 w-6 text-white" />
            <a
              href="/"
              className="text-white font-mono font-bold text-xl tracking-wider hover:text-gray-300 transition-colors"
            >
              Reseñas Huila
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {pages.map((page) => (
              <Button
                key={page}
                variant="ghost"
                className="text-white hover:text-gray-300 hover:bg-white/10"
                onClick={() => handleNavClick(page)}
              >
                {page}
              </Button>
            ))}

            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <Button variant="ghost" className="text-white hover:text-gray-300 hover:bg-white/10">
                  Lugares
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content className="bg-background border border-border rounded-md shadow-lg p-1 min-w-[200px]">
                  {categories.map((category) => (
                    <DropdownMenu.Item
                      key={category.id}
                      className="px-3 py-2 text-sm cursor-pointer hover:bg-accent rounded-sm"
                      onClick={() => navigate(`/lugares?category=${category.id}`)}
                    >
                      {category.name}
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-gray-900"
                onClick={handleLoginClick}
              >
                Iniciar Sesión
              </Button>
            ) : (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="focus:outline-none">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getInitials(userName)}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content className="bg-background border border-border rounded-md shadow-lg p-1 min-w-[180px]">
                    {settings
                      .filter((setting) => setting !== '' && (setting !== 'Dashboard' || userRole === '2'))
                      .map((setting) => (
                        <DropdownMenu.Item
                          key={setting}
                          className="px-3 py-2 text-sm cursor-pointer hover:bg-accent rounded-sm"
                          onClick={() => handleMenuItemClick(setting)}
                        >
                          {setting}
                        </DropdownMenu.Item>
                      ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <Button variant="ghost" size="icon" className="text-white">
                    <Menu className="h-6 w-6" />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content className="bg-background border border-border rounded-md shadow-lg p-1 min-w-[200px]">
                    {pages.map((page) => (
                      <DropdownMenu.Item
                        key={page}
                        className="px-3 py-2 text-sm cursor-pointer hover:bg-accent rounded-sm"
                        onClick={() => handleNavClick(page)}
                      >
                        {page}
                      </DropdownMenu.Item>
                    ))}
                    <DropdownMenu.Separator className="my-1 h-px bg-border" />
                    <DropdownMenu.Sub>
                      <DropdownMenu.SubTrigger className="px-3 py-2 text-sm cursor-pointer hover:bg-accent rounded-sm">
                        Lugares
                      </DropdownMenu.SubTrigger>
                      <DropdownMenu.Portal>
                        <DropdownMenu.SubContent className="bg-background border border-border rounded-md shadow-lg p-1 min-w-[180px]">
                          {categories.map((category) => (
                            <DropdownMenu.Item
                              key={category.id}
                              className="px-3 py-2 text-sm cursor-pointer hover:bg-accent rounded-sm"
                              onClick={() => navigate(`/lugares?category=${category.id}`)}
                            >
                              {category.name}
                            </DropdownMenu.Item>
                          ))}
                        </DropdownMenu.SubContent>
                      </DropdownMenu.Portal>
                    </DropdownMenu.Sub>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default ResponsiveAppBar;
