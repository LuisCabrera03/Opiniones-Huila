import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, Star as StarIcon, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Alert } from '../components/ui/alert';
import { Rating } from '../Components/UI/Rating';
import { useToast } from '../components/ui/use-toast';
import { useAppContext } from '../context/AppContext';
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

export default function ReviewForm({ placeId, onReviewSubmitted }) {
  const { placeId: paramPlaceId } = useParams();
  const finalPlaceId = placeId || paramPlaceId;

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { state } = useAppContext();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleRatingHover = (hoverRating) => {
    setHover(hoverRating);
  };

  const onSubmit = async (data) => {
    if (!state.currentUser) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para escribir una reseña.",
        variant: "destructive"
      });
      return;
    }

    if (rating === 0) {
      toast({
        title: "Error",
        description: "Por favor, selecciona una calificación.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const newReview = {
        id: Date.now().toString(), // Temporary ID for local storage
        placeId: finalPlaceId,
        userId: state.currentUser.id,
        userName: state.currentUser.username,
        rating: rating,
        comment: data.comment,
        date: new Date().toISOString(),
        user: {
          username: state.currentUser.username
        }
      };

      // Add review using DataService
      await DataService.addReview(newReview);

      // Reset form
      reset();
      setRating(0);
      setHover(0);

      toast({
        title: "¡Éxito!",
        description: "Tu reseña ha sido enviada correctamente.",
        variant: "default"
      });

      // Call parent callback if provided
      if (onReviewSubmitted) {
        onReviewSubmitted(newReview);
      }

    } catch (error) {
      console.error("Error al crear la reseña:", error);
      toast({
        title: "Error",
        description: "No se pudo enviar tu reseña. Inténtalo nuevamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!state.currentUser) {
    return (
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm mb-8">
        <CardContent className="text-center py-12">
          <User className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">
            Inicia sesión para escribir una reseña
          </h3>
          <p className="text-muted-foreground mb-4">
            Comparte tu experiencia con otros usuarios
          </p>
          <Button
            onClick={() => window.location.href = '/login'}
            className="bg-gradient-to-r from-blue-500 to-purple-600"
          >
            Iniciar Sesión
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <StarIcon className="w-5 h-5 text-primary" />
            Escribe tu reseña
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* User Info */}
            <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-medium">
                  {state.currentUser.username[0].toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-medium">{state.currentUser.username}</p>
                <p className="text-sm text-muted-foreground">
                  Escribiendo como {state.currentUser.username}
                </p>
              </div>
            </div>

            {/* Rating Section */}
            <div className="space-y-3">
              <Label className="text-base font-medium">
                Calificación *
              </Label>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <Rating
                  value={rating}
                  onChange={handleRatingChange}
                  onHover={handleRatingHover}
                  size="lg"
                  className="cursor-pointer"
                />
                <div className="text-sm text-muted-foreground">
                  {hover > 0 || rating > 0 ? (
                    <span className="font-medium">
                      {labels[hover || rating]} ({hover || rating}/5)
                    </span>
                  ) : (
                    'Selecciona una calificación'
                  )}
                </div>
              </div>
            </div>

            {/* Comment Section */}
            <div className="space-y-3">
              <Label htmlFor="comment" className="text-base font-medium">
                Comentario
              </Label>
              <Textarea
                id="comment"
                placeholder="Comparte tu experiencia en este lugar..."
                rows={4}
                className="resize-none"
                {...register("comment", {
                  maxLength: {
                    value: 500,
                    message: "El comentario no puede tener más de 500 caracteres"
                  }
                })}
              />
              {errors.comment && (
                <p className="text-sm text-destructive">
                  {errors.comment.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting || rating === 0}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Enviar Reseña
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  reset();
                  setRating(0);
                  setHover(0);
                }}
                disabled={isSubmitting}
              >
                Limpiar
              </Button>
            </div>

            {/* Guidelines */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="text-sm font-medium text-blue-900 mb-2">
                Pautas para reseñas
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Sé honesto y describe tu experiencia real</li>
                <li>• Mantén un lenguaje respetuoso</li>
                <li>• Incluye detalles específicos que puedan ayudar a otros</li>
              </ul>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}