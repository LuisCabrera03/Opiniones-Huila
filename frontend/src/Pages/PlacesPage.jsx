import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  Eye,
  MapIcon,
  Building2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { LoadingSpinner } from '../Components/UI/LoadingSpinner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import Header from '../Common/Header';
import { DataService } from '../Services/dataService';
import { useToast } from '../components/ui/use-toast';

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [placesData, categoriesData] = await Promise.all([
          DataService.getAllPlaces(),
          DataService.getAllCategories()
        ]);

        setPlaces(placesData);
        setCategories(categoriesData);
        setFilteredPlaces(placesData);
      } catch (error) {
        console.error('Error al obtener datos:', error);
        toast({
          title: "Error",
          description: "Error al cargar lugares y categorías",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  useEffect(() => {
    let filtered = places;

    if (searchTerm) {
      filtered = filtered.filter(place =>
        place.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        place.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(place =>
        place.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredPlaces(filtered);
  }, [searchTerm, selectedCategory, places]);

  const handleDelete = async (placeId) => {
    try {
      await DataService.deletePlace(placeId);
      setPlaces(places.filter(place => place.id !== placeId));
      toast({
        title: "Lugar eliminado",
        description: "El lugar ha sido eliminado correctamente",
        variant: "default"
      });
    } catch (error) {
      console.error('Error al eliminar lugar:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el lugar",
        variant: "destructive"
      });
    }
  };

  const stats = [
    {
      title: "Total Lugares",
      value: places.length.toString(),
      change: "+3 este mes",
      icon: MapPin,
      color: "text-blue-600"
    },
    {
      title: "Categorías",
      value: categories.length.toString(),
      change: "Sin cambios",
      icon: Building2,
      color: "text-green-600"
    },
    {
      title: "Lugares Activos",
      value: places.filter(p => p.status === 'active').length.toString(),
      change: "+2 hoy",
      icon: MapIcon,
      color: "text-purple-600"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        <div className="container mx-auto px-4 pt-20 pb-12">
          <div className="flex items-center justify-center min-h-[400px]">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </div>
    );
  }

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
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MapPin className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold">Gestión de Lugares</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Administra los lugares, categorías y información del sitio
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{stat.title}</p>
                          <p className="text-3xl font-bold">{stat.value}</p>
                          <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                        </div>
                        <Icon className={`w-8 h-8 ${stat.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Controls */}
          <Card className="mb-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filtros y Acciones
                </CardTitle>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Lugar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar lugares..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="sm:w-64">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Todas las categorías</option>
                    {categories.map((category) => (
                      <option key={category.id || category.name} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Places Table */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>
                Lugares ({filteredPlaces.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Ubicación</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPlaces.length > 0 ? (
                      filteredPlaces.map((place) => (
                        <TableRow key={place.id}>
                          <TableCell className="font-medium">
                            <div>
                              <p className="font-semibold">{place.name}</p>
                              <p className="text-sm text-muted-foreground line-clamp-1">
                                {place.description}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {place.category || 'Sin categoría'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm">{place.location || 'No especificada'}</p>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={place.status === 'active' ? 'default' : 'secondary'}
                            >
                              {place.status === 'active' ? 'Activo' : 'Inactivo'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center gap-2 justify-end">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit3 className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(place.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-12">
                          <MapPin className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                            No hay lugares disponibles
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            {searchTerm || selectedCategory ?
                              'No se encontraron lugares con los filtros aplicados.' :
                              'Comienza agregando lugares para administrar.'
                            }
                          </p>
                          <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
                            <Plus className="w-4 h-4 mr-2" />
                            Agregar Primer Lugar
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PlacesPage;