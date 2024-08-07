const songService = {
  // Obtener todas las canciones
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

  // Crear una canción
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

  // Obtener una canción por ID
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

  // Obtener todas las listas de reproducción
  getPlaylists: async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) {
      throw new Error('No se encontró token de autenticación');
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/harmonyhub/playlists/`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${user.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al obtener las listas de reproducción: ${errorData.detail || response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en getPlaylists:', error);
      throw error;
    }
  },

  // Crear una lista de reproducción
  createPlaylist: async (name) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) {
      throw new Error('No se encontró token de autenticación');
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/harmonyhub/playlists/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al crear la lista de reproducción: ${errorData.detail || response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en createPlaylist:', error);
      throw error;
    }
  },

  // Agregar una canción a una lista de reproducción
  addSongToPlaylist: async (playlistId, songId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) {
      throw new Error('No se encontró token de autenticación');
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/harmonyhub/playlists/${playlistId}/songs/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ song_id: songId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al agregar la canción a la lista de reproducción: ${errorData.detail || response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en addSongToPlaylist:', error);
      throw error;
    }
  },
   deleteSong: async (songId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) {
      throw new Error('No se encontró token de autenticación');
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/harmonyhub/songs/${songId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${user.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al eliminar la canción: ${errorData.detail || response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error en deleteSong:', error);
      throw error;
    }
  },
};

export default songService;
