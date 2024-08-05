
const songService = {
  getAllSongs: async (url = null, pageSize = 12) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) {
      throw new Error('No se encontró token de autenticación');
    }

    try {
      const baseUrl = url || `${import.meta.env.VITE_API_BASE_URL}/harmonyhub/songs/`;
      const finalUrl = new URL(baseUrl);
      finalUrl.searchParams.append('page_size', pageSize);

      const response = await fetch(finalUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${user.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('No autorizado. Por favor, inicie sesión nuevamente.');
        }
        throw new Error('Error al obtener las canciones');
      }

      const data = await response.json();
      console.log('Los datos: ', data);
      return data;
    } catch (error) {
      console.error('Error al obtener las canciones:', error);
      throw error;
    }
  },

  createSong: async (songData) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) {
      throw new Error('No se encontró token de autenticación');
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/harmonyhub/songs/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(songData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('No autorizado. Por favor, inicie sesión nuevamente.');
        }
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Error al crear la canción');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al crear la canción:', error);
      throw error;
    }
  },

  getSongById: async (id) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) {
      throw new Error('No se encontró token de autenticación');
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/harmonyhub/songs/${id}/`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${user.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('No autorizado. Por favor, inicie sesión nuevamente.');
        }
        if (response.status === 404) {
          throw new Error('Canción no encontrada');
        }
        throw new Error('Error al obtener la canción');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener la canción:', error);
      throw error;
    }
  },

  

};

export default songService;