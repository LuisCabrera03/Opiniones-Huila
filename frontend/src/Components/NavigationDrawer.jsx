import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  Users,
  MapPin,
  Tag,
  MessageSquare,
  LayoutDashboard,
  LogOut,
  User,
  Settings
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '../components/ui/sheet';
import { Button } from '../components/ui/Button';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { useAppContext } from '../context/AppContext';

const menuItems = [
  {
    icon: Home,
    label: 'Inicio',
    path: '/',
    description: 'Página principal'
  },
  {
    icon: MapPin,
    label: 'Lugares',
    path: '/lugares',
    description: 'Explorar lugares'
  },
  {
    icon: MessageSquare,
    label: 'Mis Reseñas',
    path: '/mis-resenas',
    description: 'Ver mis reseñas'
  },
  {
    icon: Users,
    label: 'Usuarios',
    path: '/users',
    description: 'Gestionar usuarios',
    adminOnly: true
  },
  {
    icon: Tag,
    label: 'Categorías',
    path: '/categories',
    description: 'Gestionar categorías',
    adminOnly: true
  }
];

export default function NavigationDrawer({ open, onClose, userRole }) {
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('currentUser');
    navigate('/login');
    onClose();
  };

  const isAdmin = userRole === '2' || state.currentUser?.role === 'admin';

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 p-0 bg-white/95 backdrop-blur-sm">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <User className="w-6 h-6" />
              </div>
              <div className="text-left">
                <SheetTitle className="text-white text-lg">
                  {state.currentUser?.username || 'Usuario'}
                </SheetTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                    {isAdmin ? 'Administrador' : 'Usuario'}
                  </Badge>
                </div>
              </div>
            </div>
          </SheetHeader>

          {/* Navigation Items */}
          <div className="flex-1 py-6 overflow-y-auto">
            <nav className="space-y-2 px-4">
              {menuItems.map((item, index) => {
                const Icon = item.icon;

                // Filter admin-only items
                if (item.adminOnly && !isAdmin) {
                  return null;
                }

                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05
                    }}
                  >
                    <Button
                      variant="ghost"
                      onClick={() => handleNavigation(item.path)}
                      className="w-full justify-start h-auto p-4 hover:bg-primary/10 group"
                    >
                      <Icon className="w-5 h-5 mr-3 text-primary group-hover:text-primary/80 transition-colors" />
                      <div className="text-left flex-1">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {item.description}
                        </div>
                      </div>
                    </Button>
                  </motion.div>
                );
              })}

              {/* Admin Section */}
              {isAdmin && (
                <>
                  <Separator className="my-4" />
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: menuItems.length * 0.05
                    }}
                  >
                    <Button
                      variant="ghost"
                      onClick={() => handleNavigation('/dashboard')}
                      className="w-full justify-start h-auto p-4 hover:bg-amber-100 group"
                    >
                      <LayoutDashboard className="w-5 h-5 mr-3 text-amber-600 group-hover:text-amber-700 transition-colors" />
                      <div className="text-left flex-1">
                        <div className="font-medium">Dashboard</div>
                        <div className="text-xs text-muted-foreground">
                          Panel de administración
                        </div>
                      </div>
                      <Badge variant="outline" className="border-amber-200 text-amber-700">
                        Admin
                      </Badge>
                    </Button>
                  </motion.div>
                </>
              )}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-muted/30">
            <div className="space-y-2">
              <Button
                variant="ghost"
                onClick={() => handleNavigation('/settings')}
                className="w-full justify-start hover:bg-muted/50"
              >
                <Settings className="w-4 h-4 mr-3" />
                Configuración
              </Button>

              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full justify-start border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Cerrar Sesión
              </Button>
            </div>

            {/* App Info */}
            <div className="mt-4 pt-4 border-t">
              <p className="text-xs text-center text-muted-foreground">
                Opiniones Huila v2.0
              </p>
              <p className="text-xs text-center text-muted-foreground">
                Powered by shadcn/ui
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}