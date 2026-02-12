import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Share2, MapPin, Star, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Rating } from '../Components/UI/Rating';
import { useToast } from '../components/ui/use-toast';

export default function Tarjetas({ places }) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCardClick = (placeId) => {
    navigate(`/lugares/${placeId}`);
  };

  const handleShareClick = async (place, event) => {
    event.stopPropagation(); // Prevent card click

    const shareData = {
      title: place.name,
      text: place.description,
      url: window.location.origin + `/lugares/${place.id || place.place_id}`,
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        toast({
          title: "¡Compartido!",
          description: "El lugar ha sido compartido exitosamente.",
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error al compartir', error);
          copyToClipboard(shareData.url);
        }
      }
    } else {
      copyToClipboard(shareData.url);
    }
  };

  const copyToClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Enlace copiado",
        description: "El enlace ha sido copiado al portapapeles.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo copiar el enlace al portapapeles.",
        variant: "destructive"
      });
    }
  };

  if (!places || places.length === 0) {
    return (
      <div className="text-center py-12">
        <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-muted-foreground mb-2">
          No hay lugares disponibles
        </h3>
        <p className="text-muted-foreground">
          Vuelve más tarde para ver nuevos lugares.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {places.map((place, index) => (
        <motion.div
          key={place.id || place.place_id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1
          }}
          whileHover={{ y: -8 }}
          className="cursor-pointer"
        >
          <Card
            className="h-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 group"
            onClick={() => handleCardClick(place.id || place.place_id)}
          >
            {/* Image Section */}
            <div className="relative overflow-hidden">
              <img
                src={place.image || place.images?.[0]?.url || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'}
                alt={place.name}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Share Button Overlay */}
              <Button
                size="sm"
                variant="secondary"
                className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-white opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                onClick={(e) => handleShareClick(place, e)}
              >
                <Share2 className="w-4 h-4" />
              </Button>

              {/* Category Badge */}
              {place.category && (
                <Badge
                  variant="secondary"
                  className="absolute top-3 left-3 bg-white/90 text-gray-800 backdrop-blur-sm"
                >
                  {place.category}
                </Badge>
              )}
            </div>

            {/* Card Header */}
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                    <AvatarImage
                      src={place.avatar || ''}
                      alt={place.name}
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {place.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg line-clamp-1 group-hover:text-primary transition-colors">
                      {place.name}
                    </CardTitle>
                    {place.location && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <MapPin className="w-3 h-3" />
                        <span className="line-clamp-1">{place.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>

            {/* Card Content */}
            <CardContent className="pt-0">
              {/* Description */}
              {place.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {place.description}
                </p>
              )}

              {/* Rating and Stats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Rating
                      value={place.rating || place.average_rating || 0}
                      readOnly
                      size="sm"
                    />
                    <span className="text-sm font-medium">
                      {(place.rating || place.average_rating || 0).toFixed(1)}
                    </span>
                  </div>
                  {place.totalReviews && (
                    <span className="text-xs text-muted-foreground">
                      {place.totalReviews} {place.totalReviews === 1 ? 'reseña' : 'reseñas'}
                    </span>
                  )}
                </div>

                {/* Action Button */}
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 group-hover:shadow-md transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(place.id || place.place_id);
                  }}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Ver detalles
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}