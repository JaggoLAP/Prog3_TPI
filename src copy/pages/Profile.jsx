import React from 'react';
import useSongs from '../hooks/useSongs';


const Profile = () => {
  const { songs, error } = useSongs();

  return (
    <div>
      <h1>Perfil</h1>
      {error && <p>Error al cargar las canciones: {error.message}</p>}
      <ul>
        {songs.map((song) => (
          <li key={song.id}>{song.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;