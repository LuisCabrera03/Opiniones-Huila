import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, Shield, CheckCircle, Mail, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';

import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { useToast } from '../components/ui/use-toast';
import { cn } from '../lib/utils';

function LoginNew() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);
  const [passwordSetup, setPasswordSetup] = useState(false);
  const [googleEmail, setGoogleEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm();

  const password = watch('password');

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    return {
      length: password?.length >= minLength,
      uppercase: hasUpperCase,
      number: hasNumber,
      special: hasSpecialChar,
      valid: password?.length >= minLength && hasUpperCase && hasNumber && hasSpecialChar
    };
  };

  const passwordValidation = validatePassword(password);

  const handleGoogleSuccess = async (response) => {
    setLoading(true);
    try {
      const token = response.credential;
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      const decodedToken = JSON.parse(jsonPayload);
      setGoogleEmail(decodedToken.email);

      // Simular respuesta de backend
      const isNewUser = Math.random() > 0.5; // Simulación

      if (isNewUser) {
        setPasswordSetup(true);
        toast({
          title: "Bienvenido!",
          description: "Configure su contraseña para completar el registro.",
          variant: "default",
        });
      } else {
        localStorage.setItem('authToken', 'google_token_' + Date.now());
        localStorage.setItem('userName', decodedToken.name);
        localStorage.setItem('userEmail', decodedToken.email);

        toast({
          title: "¡Inicio de sesión exitoso!",
          description: `Bienvenido de vuelta, ${decodedToken.name}`,
          variant: "success",
        });

        setTimeout(() => navigate('/'), 1500);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error durante el inicio de sesión con Google.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handlePasswordSetup = async (data) => {
    setLoading(true);
    try {
      // Simular llamada API
      await new Promise(resolve => setTimeout(resolve, 1000));

      localStorage.setItem('authToken', 'new_user_token_' + Date.now());
      localStorage.setItem('userName', googleEmail.split('@')[0]);
      localStorage.setItem('userEmail', googleEmail);

      toast({
        title: "¡Registro completado!",
        description: "Su cuenta ha sido creada exitosamente.",
        variant: "success",
      });

      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al configurar la contraseña.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleFormSubmit = async (data) => {
    setLoading(true);
    try {
      // Simular llamada API
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (isSignUp) {
        localStorage.setItem('authToken', 'signup_token_' + Date.now());
        localStorage.setItem('userName', data.name || data.email.split('@')[0]);

        toast({
          title: "¡Cuenta creada!",
          description: "Su cuenta ha sido creada exitosamente.",
          variant: "success",
        });
      } else {
        localStorage.setItem('authToken', 'login_token_' + Date.now());
        localStorage.setItem('userName', data.email.split('@')[0]);

        toast({
          title: "¡Bienvenido de vuelta!",
          description: "Inicio de sesión exitoso.",
          variant: "success",
        });
      }

      localStorage.setItem('userEmail', data.email);
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      toast({
        title: "Error",
        description: isSignUp ? "Error al crear la cuenta." : "Credenciales inválidas.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>

            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {passwordSetup ? 'Configurar Contraseña' : isSignUp ? 'Crear Cuenta' : 'Iniciar Sesión'}
            </CardTitle>

            <CardDescription className="text-gray-600">
              {passwordSetup
                ? 'Complete su registro configurando una contraseña segura'
                : isSignUp
                ? 'Únete a nuestra comunidad de reseñas'
                : 'Bienvenido de vuelta a Reseñas Huila'
              }
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <AnimatePresence mode="wait">
              {passwordSetup ? (
                <motion.form
                  key="password-setup"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmit(handlePasswordSetup)}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email (Google)
                    </Label>
                    <Input
                      type="email"
                      value={googleEmail}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Nueva Contraseña
                    </Label>
                    <div className="relative">
                      <Input
                        {...register('password', {
                          required: 'La contraseña es requerida',
                          validate: (value) => validatePassword(value).valid || 'La contraseña no cumple los requisitos'
                        })}
                        type={showPassword ? 'text' : 'password'}
                        className="pr-10"
                        placeholder="Crear contraseña segura"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    {password && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-2 text-xs"
                      >
                        <div className={cn("flex items-center gap-2", passwordValidation.length ? "text-green-600" : "text-gray-400")}>
                          <CheckCircle className="w-3 h-3" />
                          Mínimo 8 caracteres
                        </div>
                        <div className={cn("flex items-center gap-2", passwordValidation.uppercase ? "text-green-600" : "text-gray-400")}>
                          <CheckCircle className="w-3 h-3" />
                          Una letra mayúscula
                        </div>
                        <div className={cn("flex items-center gap-2", passwordValidation.number ? "text-green-600" : "text-gray-400")}>
                          <CheckCircle className="w-3 h-3" />
                          Un número
                        </div>
                        <div className={cn("flex items-center gap-2", passwordValidation.special ? "text-green-600" : "text-gray-400")}>
                          <CheckCircle className="w-3 h-3" />
                          Un carácter especial
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                    <div className="relative">
                      <Input
                        {...register('confirmPassword', {
                          required: 'Confirme su contraseña',
                          validate: (value) => value === password || 'Las contraseñas no coinciden'
                        })}
                        type={showConfirmPassword ? 'text' : 'password'}
                        className="pr-10"
                        placeholder="Confirmar contraseña"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    disabled={loading || !passwordValidation.valid}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Configurando...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Completar Registro
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="main-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Google Login */}
                  <div className="space-y-4">
                    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
                      <div className="flex justify-center">
                        <GoogleLogin
                          onSuccess={handleGoogleSuccess}
                          onError={() => toast({
                            title: "Error",
                            description: "Error al iniciar sesión con Google",
                            variant: "destructive",
                          })}
                          useOneTap
                          theme="outline"
                          size="large"
                          text={isSignUp ? "signup_with" : "signin_with"}
                          shape="rectangular"
                          logo_alignment="left"
                        />
                      </div>
                    </GoogleOAuthProvider>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-300" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-gray-500">O continúa con email</span>
                      </div>
                    </div>

                    {/* Email/Password Form */}
                    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                      {isSignUp && (
                        <div className="space-y-2">
                          <Label htmlFor="name">Nombre completo</Label>
                          <Input
                            {...register('name', { required: isSignUp && 'El nombre es requerido' })}
                            placeholder="Tu nombre completo"
                          />
                          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          {...register('email', {
                            required: 'El email es requerido',
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: 'Email inválido'
                            }
                          })}
                          type="email"
                          placeholder="tu@email.com"
                        />
                        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <div className="relative">
                          <Input
                            {...register('password', {
                              required: 'La contraseña es requerida',
                              ...(isSignUp && {
                                validate: (value) => validatePassword(value).valid || 'La contraseña no cumple los requisitos'
                              })
                            })}
                            type={showPassword ? 'text' : 'password'}
                            className="pr-10"
                            placeholder="Tu contraseña"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                        {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
                      </div>

                      {isSignUp && (
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                          <div className="relative">
                            <Input
                              {...register('confirmPassword', {
                                required: 'Confirme su contraseña',
                                validate: (value) => value === password || 'Las contraseñas no coinciden'
                              })}
                              type={showConfirmPassword ? 'text' : 'password'}
                              className="pr-10"
                              placeholder="Confirmar contraseña"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                          </div>
                          {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>}
                        </div>
                      )}

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            {isSignUp ? 'Creando cuenta...' : 'Iniciando sesión...'}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            {isSignUp ? 'Crear cuenta' : 'Iniciar sesión'}
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        )}
                      </Button>
                    </form>

                    <div className="text-center">
                      <Button
                        variant="link"
                        onClick={() => {
                          setIsSignUp(!isSignUp);
                          reset();
                        }}
                        className="text-sm text-gray-600 hover:text-gray-800"
                      >
                        {isSignUp
                          ? '¿Ya tienes cuenta? Inicia sesión'
                          : '¿No tienes cuenta? Regístrate'
                        }
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6 text-sm text-gray-600"
        >
          Al continuar, aceptas nuestros{' '}
          <button className="text-blue-600 hover:underline">Términos de Servicio</button>
          {' '}y{' '}
          <button className="text-blue-600 hover:underline">Política de Privacidad</button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default LoginNew;