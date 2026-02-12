import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, MapPin, MessageSquare, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/badge';
import Header from '../Common/Header';

const Dashboard = () => {
  const stats = [
    {
      title: "Total Lugares",
      value: "127",
      change: "+12%",
      icon: MapPin,
      color: "text-blue-600"
    },
    {
      title: "Usuarios Activos",
      value: "1,234",
      change: "+8%",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Reseñas",
      value: "3,456",
      change: "+23%",
      icon: MessageSquare,
      color: "text-purple-600"
    },
    {
      title: "Calificación Promedio",
      value: "4.2",
      change: "+0.3",
      icon: BarChart3,
      color: "text-amber-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <div className="container mx-auto px-4 pt-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">Panel de Administración</h1>
                <p className="text-muted-foreground">
                  Gestión y estadísticas de Opiniones Huila
                </p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
              <Settings className="w-4 h-4 mr-2" />
              Configuración
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1
                  }}
                >
                  <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {stat.title}
                          </p>
                          <p className="text-2xl font-bold">
                            {stat.value}
                          </p>
                          <Badge variant="outline" className="mt-2">
                            {stat.change}
                          </Badge>
                        </div>
                        <Icon className={`w-8 h-8 ${stat.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Coming Soon Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Dashboard Avanzado</CardTitle>
              </CardHeader>
              <CardContent className="text-center py-12">
                <BarChart3 className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                  Próximamente
                </h3>
                <p className="text-muted-foreground mb-4">
                  Gráficos detallados, reportes y análisis avanzados estarán disponibles pronto.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-medium">Gráficos Interactivos</h4>
                    <p className="text-sm text-muted-foreground">Visualiza datos con gráficos modernos</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-medium">Reportes</h4>
                    <p className="text-sm text-muted-foreground">Genera reportes detallados</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-medium">Analytics</h4>
                    <p className="text-sm text-muted-foreground">Análisis de tendencias</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;