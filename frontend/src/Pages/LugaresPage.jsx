import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/badge';
import { LoadingSpinner } from '../Components/UI/LoadingSpinner';
import Tarjetas from '../Components/Tarjeta';
import Header from '../Common/Header';
import { DataService } from '../Services/dataService';
import { useToast } from '../components/ui/use-toast';

const LugaresPage = () => {
  const [categories, setCategories] = useState([]);
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories and places using DataService
        const [categoriesData, placesData] = await Promise.all([
          DataService.getAllCategories(),
          DataService.getAllPlaces()
        ]);

        setCategories(categoriesData);
        setPlaces(placesData);
        setFilteredPlaces(placesData);
      } catch (error) {
        console.error('Error al obtener datos:', error);
        toast({
          title: "Error",
          description: "Error al cargar los lugares y categorías",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const categoryFromUrl = query.get('categoria');

    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
      handleCategoryFilter(categoryFromUrl);
    }
  }, [location.search, places]);

  const handleCategoryFilter = (category) => {
    if (category === '' || category === 'todas') {
      setFilteredPlaces(places);
      setSelectedCategory('');
      navigate('/lugares');
    } else {
      const filtered = places.filter(place =>
        place.category?.toLowerCase() === category.toLowerCase()
      );
      setFilteredPlaces(filtered);
      setSelectedCategory(category);
      navigate(`/lugares?categoria=${category}`);
    }
  };

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
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MapPin className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold">
                Descubre Lugares en Huila
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explora los mejores lugares, restaurantes y sitios de interés recomendados por nuestra comunidad.
            </p>
          </div>

          {/* Category Filter */}
          <Card className="mb-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filtrar por Categoría
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant={selectedCategory === '' ? "default" : "outline"}
                  onClick={() => handleCategoryFilter('')}
                  className="transition-all duration-200"
                >
                  Todas las categorías
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id || category.name}
                    variant={selectedCategory === category.name ? "default" : "outline"}
                    onClick={() => handleCategoryFilter(category.name)}
                    className="transition-all duration-200"
                  >
                    {category.name}
                    {selectedCategory === category.name && (
                      <Badge variant="secondary" className="ml-2 bg-white/20">
                        {filteredPlaces.length}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>

              {/* Results summary */}
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  {selectedCategory ? (
                    <>
                      Mostrando <span className="font-semibold">{filteredPlaces.length}</span> lugares en la categoría{' '}
                      <span className="font-semibold">"{selectedCategory}"</span>
                    </>
                  ) : (
                    <>
                      Mostrando <span className="font-semibold">{filteredPlaces.length}</span> lugares en total
                    </>
                  )}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Places Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {filteredPlaces.length > 0 ? (
              <Tarjetas places={filteredPlaces} />
            ) : (
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="text-center py-12">
                  <MapPin className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                    No hay lugares disponibles
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {selectedCategory ? (
                      <>No se encontraron lugares en la categoría "{selectedCategory}".</>
                    ) : (
                      <>No hay lugares disponibles en este momento.</>
                    )}
                  </p>
                  {selectedCategory && (
                    <Button
                      onClick={() => handleCategoryFilter('')}
                      variant="outline"
                    >
                      Ver todas las categorías
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LugaresPage;