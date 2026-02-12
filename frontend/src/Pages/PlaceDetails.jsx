import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Users, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Skeleton } from '../components/ui/skeleton';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Rating } from '../Components/UI/Rating';
import { LoadingSpinner } from '../Components/UI/LoadingSpinner';
import { useToast } from '../components/ui/use-toast';
import Header from '../Common/Header';
import ReviewForm from '../Components/ReviewForm';
import { DataService } from '../Services/dataService';

const labels = {
  0.5: 'Muy Malo',
  1: 'Malo',
  1.5: 'Pobre',
  2: 'Aceptable',
  2.5: 'Regular',
  3: 'Bueno',
  3.5: 'Muy Bueno',
  4: 'Excelente',
  4.5: 'Sobresaliente',
  5: 'Perfecto',
};

// Loading Skeleton Component
const PlaceDetailsSkeleton = () => (
  <div className="max-w-4xl mx-auto">
    <Card className="mb-8 overflow-hidden">
      <Skeleton className="h-64 md:h-80 w-full" />
      <CardContent className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-32" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Review Card Component
const ReviewCard = ({ review }) => (
  <div className="space-y-3">
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-primary font-medium">
            {(review.user?.username || review.userName || 'Usuario')[0].toUpperCase()}
          </span>
        </div>
        <div>
          <p className="font-medium">
            {review.user?.username || review.userName || 'Usuario desconocido'}
          </p>
          <p className="text-sm text-muted-foreground">
            {review.created_at ? new Date(review.created_at).toLocaleDateString() :
             review.date ? new Date(review.date).toLocaleDateString() : 'Fecha no disponible'}
          </p>
        </div>
      </div>
      <Rating
        value={review.rating || 0}
        readOnly
        size="sm"
      />
    </div>

    {review.comment && (
      <p className="text-muted-foreground leading-relaxed pl-13">
        {review.comment}
      </p>
    )}
  </div>
);

export default function PlaceDetails() {
  const { placeId } = useParams();
  const [place, setPlace] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        // Use DataService for consistency with new architecture
        const placeData = await DataService.getPlaceById(placeId);
        const reviewsData = await DataService.getReviewsByPlace(placeId);

        if (placeData) {
          setPlace(placeData);
          setReviews(reviewsData || []);
        } else {
          toast({
            title: "Error",
            description: "No se encontró información sobre este lugar.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("Error fetching place details", error);
        toast({
          title: "Error",
          description: "Error al cargar la información del lugar.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPlaceDetails();
  }, [placeId, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        <div className="container mx-auto px-4 pt-20 pb-12">
          <PlaceDetailsSkeleton />
        </div>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        <div className="container mx-auto px-4 pt-20 pb-12">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="text-center py-12">
              <h2 className="text-xl font-semibold text-muted-foreground mb-2">
                Lugar no encontrado
              </h2>
              <p className="text-muted-foreground">
                No se encontró información sobre este lugar.
              </p>
              <Button
                onClick={() => window.history.back()}
                className="mt-4"
              >
                Volver atrás
              </Button>
            </CardContent>
          </Card>
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
          {/* Hero Section */}
          <Card className="mb-8 overflow-hidden shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <div className="relative">
              {/* Image Container */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                {!imageLoaded && (
                  <Skeleton className="absolute inset-0 w-full h-full" />
                )}
                <img
                  src={place.image || place.images?.[0]?.url || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'}
                  alt={place.name}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    {place.category && (
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        {place.category}
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    {place.name}
                  </h1>
                  {place.location && (
                    <div className="flex items-center gap-1 text-white/90">
                      <MapPin className="w-4 h-4" />
                      <span>{place.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <CardContent className="p-6">
              {/* Rating Section */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <Rating
                    value={place.rating || place.average_rating || 0}
                    readOnly
                    size="lg"
                  />
                  <span className="text-2xl font-bold">
                    {(place.rating || place.average_rating || 0).toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>
                    {place.totalReviews || reviews.length} {(place.totalReviews || reviews.length) === 1 ? 'reseña' : 'reseñas'}
                  </span>
                </div>
              </div>

              {/* Description */}
              {place.description && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Acerca de este lugar</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {place.description}
                  </p>
                </div>
              )}

              {/* Additional Info */}
              {(place.address || place.phone || place.website) && (
                <div className="mt-6 pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-4">Información adicional</h3>
                  <div className="grid gap-2">
                    {place.address && (
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-1 text-muted-foreground" />
                        <span className="text-sm">{place.address}</span>
                      </div>
                    )}
                    {place.phone && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Teléfono:</span>
                        <span className="text-sm">{place.phone}</span>
                      </div>
                    )}
                    {place.website && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Sitio web:</span>
                        <a
                          href={place.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          {place.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Review Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ReviewForm placeId={placeId} onReviewSubmitted={() => {
              // Refresh reviews when a new one is submitted
              DataService.getReviewsByPlace(placeId).then(setReviews);
            }} />
          </motion.div>

          {/* Reviews Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  Reseñas ({reviews.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.map((review, index) => (
                      <motion.div
                        key={review.id || index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <ReviewCard review={review} />
                        {index < reviews.length - 1 && <Separator className="mt-6" />}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Star className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                      No hay reseñas aún
                    </h3>
                    <p className="text-muted-foreground">
                      Sé el primero en escribir una reseña sobre este lugar.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}