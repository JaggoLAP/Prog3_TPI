import React, { useEffect, useState } from 'react';
import { fetchSongs } from '../services/api';


const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState('');

    useEffect(() => {
    const loadSongs = async () => {
      try {
        const data = await fetchSongs();
        setSongs(data);
      } catch (err) {
        setError('Error loading songs');
      }
    };

    loadSongs();
  }, []); 

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ backgroundColor: 'black', color: 'white', padding: '20px' }}>
      <h1>Songs</h1>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>{song.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Songs;