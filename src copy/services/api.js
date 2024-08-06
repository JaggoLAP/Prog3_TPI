import axios from 'axios';


const API_URL = 'http://sandbox.academiadevelopers.com/harmonyhub';

const handleApiError = (error) => {
  console.error('API Error:', error);
  return [];
};

export const fetchSongs = async () => {
  try {
    const response = await axios.get(`${API_URL}/songs/`);
    return response.data; 
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchPlaylists = async () => {
  try {
    const response = await axios.get(`${API_URL}/playlists/`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchAlbums = async () => {
  try {
    const response = await axios.get(`${API_URL}/albums/`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchArtists = async () => {
  try {
    const response = await axios.get(`${API_URL}/artists/`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchGenres = async () => {
  try {
    const response = await axios.get(`${API_URL}/genres/`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchPlaylistEntries = async () => {
  try {
    const response = await axios.get(`${API_URL}/playlist-entries/`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchSongArtists = async () => {
  try {
    const response = await axios.get(`${API_URL}/song-artists/`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchSongGenres = async () => {
  try {
    const response = await axios.get(`${API_URL}/song-genres/`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
export const uploadSong = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${API_URL}/songs/upload/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteSong = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/songs/${id}/`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};