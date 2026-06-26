import { useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../stores/auth.store';

export default function useAuthMutation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const setUser = useAuthStore((state) => state.setUser);

  const mutate = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        'http://localhost:3001/auth/register/consumer',
        {
          nombre: formData.nombre,
          correo: formData.correo,
          contrasena: formData.contrasena,
          confirmacionContrasena: formData.confirmacionContrasena,
          consentimientoPrivacidad: true,
        },
        {
          withCredentials: true,
        }
      );

      const data = response.data || {};
      const userData = {
        id: data.id || data.user?.id,
        nombre: data.nombre || data.user?.nombre || formData.nombre,
        correo: data.correo || data.user?.correo || formData.correo,
        rol: data.rol || data.user?.rol || 'consumidor',
      };

      setUser(userData);
      return userData;
    } catch (err) {
      let errorMessage = 'Ocurrió un error inesperado';
      if (err.response) {
        if (err.response.status === 409) {
          errorMessage = 'correo_duplicado';
        } else if (err.response.data && err.response.data.message) {
          errorMessage = Array.isArray(err.response.data.message)
            ? err.response.data.message[0]
            : err.response.data.message;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      throw new Error(errorMessage, { cause: err });
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
}
