import axios from 'axios';

const api = axios.create({
  baseURL: '/api/graph-proxy',
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError = {
      status: error.response?.status || 500,
      message: 'Error desconocido',
      details: error.response?.data || {}
    };

    if (error.response) {
      switch (error.response.status) {
        case 400: customError.message = 'Solicitud incorrecta (Bad Request)'; break;
        case 404: customError.message = 'Recurso no encontrado'; break;
        case 500: customError.message = 'Error interno del servidor de la API'; break;
        default: customError.message = 'Ocurrió un error al procesar la solicitud';
      }
    } else if (error.request) {
      customError.message = 'No se pudo conectar con el servidor';
    }
    
    return Promise.reject(customError);
  }
);

export default api;