import axios from 'axios';
import URLS from './URLS.json';


const authService = {
  login: async (credentials) => {
    
    try {
        let config = {
          method: URLS.AUTH.LOGIN.method,
          url:  URLS.AUTH.LOGIN.path,
          headers: {
            'Content-Type': 'application/json'
          },
          data: credentials
        };
  
        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
        return response.data
    } catch(err) {

    }
  },
  refresh: async () => {
    try {
      const refreshUrl = URLS.AUTH.REFRESH.path;
      const token = localStorage.getItem('token');
      const response = await axios.post(refreshUrl, { token });
      const newToken = response.data.token;
      localStorage.setItem('token', newToken);
      return newToken;
    } catch (error) {
      console.error('Error al refrescar el token:', error);
      throw error;
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    // Otras acciones necesarias al cerrar sesión
  },
  startTokenRefresh: () => {
    const intervalMinutes = 30; // Intervalo de tiempo en minutos para refrescar el token
    setInterval(async () => {
      try {
        if (sessionStorage.getItem("token")){
            await authService.refresh();
        }
    
      } catch (error) {
        console.error('Error al refrescar el token automáticamente:', error);
        // Manejo de errores si es necesario
      }
    }, intervalMinutes * 60 * 1000); // Convierte los minutos a milisegundos
  }
};

export default authService;
