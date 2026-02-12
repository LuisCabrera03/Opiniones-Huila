import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star, MapPin, Calendar, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Rating } from '../Components/UI/Rating';
import { LoadingSpinner } from '../Components/UI/LoadingSpinner';
import { useToast } from '../components/ui/use-toast';
import { useAppContext } from '../context/AppContext';
import { DataService } from '../Services/dataService';
import Header from '../Common/Header';

const MisReseñas = () => {
  const [reseñas, setReseñas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { state } = useAppContext();
  const { toast } = useToast();

  useEffect(() => {
    const fetchReseñas = async () => {
      try {
        // Use current user from context instead of localStorage
        if (!state.currentUser) {
          setError('Debes iniciar sesión para ver tus reseñas.');
          setLoading(false);
          return;
        }

        // Get user's reviews using DataService
        const userReviews = await DataService.getReviewsByUser(state.currentUser.id);

        if (userReviews && userReviews.length > 0) {
          setReseñas(userReviews);
        } else {
          setReseñas([]);
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Error al cargar las reseñas.');
        toast({
          title: "Error",
          description: "No se pudieron cargar tus reseñas.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReseñas();
  }, [state.currentUser, toast]);

  const handleDeleteReview = async (reviewId) => {
    try {
      await DataService.deleteReview(reviewId);
      setReseñas(prev => prev.filter(review => review.id !== reviewId));
      toast({
        title: "Reseña eliminada",
        description: "Tu reseña ha sido eliminada correctamente.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar la reseña.",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha no disponible';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        <div className="container mx-auto px-4 pt-20 pb-12">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-muted-foreground mb-2">
                {error}
              </h2>
              <Button
                onClick={() => window.location.href = '/login'}
                className="mt-4"
              >
                Iniciar Sesión
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (reseñas.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        <div className="container mx-auto px-4 pt-20 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <MessageSquare className="w-8 h-8 text-primary" />
                <h1 className="text-4xl font-bold">Mis Reseñas</h1>
              </div>
              <p className="text-lg text-muted-foreground">
                Aquí puedes ver y gestionar todas las reseñas que has escrito
              </p>
            </div>

            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                  No has escrito reseñas aún
                </h3>
                <p className="text-muted-foreground mb-4">
                  Explora lugares y comparte tu experiencia con otros usuarios.
                </p>
                <Button
                  onClick={() => window.location.href = '/lugares'}
                  className="bg-gradient-to-r from-blue-500 to-purple-600"
                >
                  Explorar Lugares
                </Button>
              </CardContent>
            </Card>
          </motion.div>
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
          className="max-w-4xl mx-auto"
        >
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MessageSquare className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold">Mis Reseñas</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Has escrito {reseñas.length} {reseñas.length === 1 ? 'reseña' : 'reseñas'}
            </p>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {reseñas.map((reseña, index) => (
              <motion.div
                key={reseña.id || reseña.review_id || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1
                }}
              >
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12 border-2 border-primary/20">
                          <AvatarImage
                            src={state.currentUser?.avatar}
                            alt={state.currentUser?.username}
                          />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {state.currentUser?.username?.[0]?.toUpperCase() || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            {reseña.place?.name || reseña.Place?.name || 'Lugar no disponible'}
                          </CardTitle>
                          <div className="flex items-center gap-4 mt-1">
                            <Rating
                              value={reseña.rating || 0}
                              readOnly
                              size="sm"
                            />
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(reseña.created_at || reseña.date)}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-blue-50"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteReview(reseña.id || reseña.review_id)}
                          className="hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  {reseña.comment && (
                    <CardContent className="pt-0">
                      <Separator className="mb-4" />
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Tu comentario:
                        </h4>
                        <p className="text-muted-foreground leading-relaxed">
                          "{reseña.comment}"
                        </p>
                      </div>
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8"
          >
            <Card className="shadow-xl border-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm">
              <CardContent className="py-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      {reseñas.length}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Total de reseñas
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      {reseñas.length > 0 ? (
                        (reseñas.reduce((sum, r) => sum + (r.rating || 0), 0) / reseñas.length).toFixed(1)
                      ) : '0.0'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Calificación promedio
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      {new Set(reseñas.map(r => r.place?.id || r.Place?.id || r.placeId)).size}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Lugares visitados
                    </p>
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

export default MisReseñas;