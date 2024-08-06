// src/hooks/useSongs.js
import { useState, useEffect } from 'react';
import { fetchSongs } from '../services/api';

const useSongs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const loadSongs = async () => {
      try {
        const data = await fetchSongs(signal);
        setSongs(data);
      } catch (err) {
        if (err.name !== 'CanceledError') {
          setError('Error loading songs');
        }
      } finally {
        setLoading(false);
      }
    };
    loadSongs();
    return () => controller.abort();
  }, []);
  return { songs, loading, error };
};

export default useSongs;