import axios from 'axios';

const API_URL = 'https://resenas-backend-20b57109bfac.herokuapp.com/api/places'; // Cambia esto a la URL correcta de tu API

export const getPlaces = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los lugares');
  }
};

export const createPlace = async (place) => {
  try {
    const response = await axios.post(API_URL, place);
    return response.data;
  } catch (error) {
    throw new Error('Error al crear el lugar');
  }
};

export const updatePlace = async (placeId, updatedPlace) => {
  try {
    const response = await axios.put(`${API_URL}/${placeId}`, updatedPlace);
    return response.data;
  } catch (error) {
    throw new Error('Error al actualizar el lugar');
  }
};

export const deletePlace = async (placeId) => {
  try {
    const response = await axios.delete(`${API_URL}/${placeId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al eliminar el lugar');
  }
};
