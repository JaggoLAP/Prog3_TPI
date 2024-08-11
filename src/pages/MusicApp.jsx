import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const MusicApp = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('Listas de Reproducción');
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const [selectedSongs, setSelectedSongs] = useState(new Set());
  const [playlists, setPlaylists] = useState([]);
  const [songs, setSongs] = useState([
    { id: 1, title: 'Canción 1' },
    { id: 2, title: 'Canción 2' },
    
  ]);
  const [viewingPlaylist, setViewingPlaylist] = useState(null);


  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim() !== '') {
      const newPlaylist = {
        id: new Date().toISOString(),
        name: newPlaylistName,
        songs: [] 
      };
      setPlaylists([...playlists, newPlaylist]);
      setNewPlaylistName('');
    }
  };

  // Función para seleccionar/deseleccionar una canción
  const handleSelectSong = (songId) => {
    setSelectedSongs(prev => new Set(prev.has(songId) ? [...prev].filter(id => id !== songId) : [...prev, songId]));
  };

  // Función para agregar canciones a la lista de reproducción seleccionada
  const handleAddSongsToPlaylist = () => {
    if (selectedPlaylist && selectedSongs.size > 0) {
      setPlaylists(playlists.map(playlist => 
        playlist.id === selectedPlaylist
          ? { ...playlist, songs: [...playlist.songs, ...Array.from(selectedSongs)] }
          : playlist
      ));
      setSelectedSongs(new Set());
    }
  };

  // Función para ver los detalles de la lista de reproducción
  const handleViewPlaylist = (playlistId) => {
    const playlist = playlists.find(pl => pl.id === playlistId);
    setViewingPlaylist(playlist);
  };

  // Función para cerrar los detalles de la lista de reproducción
  const handleClosePlaylistDetails = () => {
    setViewingPlaylist(null);
  };

  // Función para redirigir a la vista de una lista de reproducción
  const handleRedirectToPlaylist = (playlistId) => {
    navigate(`/MusicApp/${playlistId}`);
  };

  return (
    <div>
      {/* Navegación entre pestañas */}
      <nav>
        <button onClick={() => setActiveTab('Listas de Reproducción')}>Listas de Reproducción</button>
        <button onClick={() => setActiveTab('Canciones')}>Canciones</button>
      </nav>

      {activeTab === 'Listas de Reproducción' && (
        <>
          <h2 className="title has-text-centered">Listas de Reproducción</h2>
          
          {/* Crear Nueva Lista de Reproducción */}
          <div className="box">
            <h3 className="subtitle has-text-centered">Crear Nueva Lista de Reproducción</h3>
            <div className="field">
              <label className="label">Nombre de la Lista</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  placeholder="Nombre de la lista"
                />
              </div>
            </div>
            <div className="control has-text-centered">
              <button
                className="button is-primary"
                onClick={handleCreatePlaylist}
              >
                Crear Lista
              </button>
            </div>
          </div>
          
          {/* Agregar Canciones a la Lista */}
          <div className="box mt-5">
            <h3 className="subtitle has-text-centered">Agregar Canciones a la Lista</h3>
            <div className="field">
              <label className="label">Selecciona una Lista de Reproducción</label>
              <div className="control">
                <div className="select">
                  <select
                    value={selectedPlaylist || ''}
                    onChange={(e) => setSelectedPlaylist(e.target.value)}
                  >
                    <option value="" disabled>Selecciona una lista</option>
                    {playlists.map((playlist) => (
                      <option key={playlist.id} value={playlist.id}>
                        {playlist.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Selecciona Canciones</label>
              {songs.map((song) => (
                <div key={song.id} className="field">
                  <div className="control">
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        checked={selectedSongs.has(song.id)}
                        onChange={() => handleSelectSong(song.id)}
                      />
                      {' '}{song.title}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <div className="control has-text-centered">
              <button
                className="button is-primary"
                onClick={handleAddSongsToPlaylist}
              >
                Agregar a Lista
              </button>
            </div>
          </div>
          
          {/* Listas de Reproducción Existentes */}
          <div className="box mt-5">
            <h3 className="subtitle has-text-centered">Listas de Reproducción Existentes</h3>
            {playlists.length > 0 ? (
              <div className="columns is-multiline">
                {playlists.map((playlist) => (
                  <div key={playlist.id} className="column is-one-third">
                    <div className="card">
                      <header className="card-header">
                        <p className="card-header-title">{playlist.name}</p>
                      </header>
                      <div className="card-content">
                        <div className="content">
                          <p><strong>ID:</strong> {playlist.id}</p>
                          <div className="control has-text-centered">
                            <button
                              className="button is-link"
                              onClick={() => handleRedirectToPlaylist(playlist.id)}
                            >
                              Ver Lista
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="has-text-centered">No hay listas de reproducción disponibles</p>
            )}
          </div>
        </>
      )}

      {/* Detalles de la Lista de Reproducción */}
      {viewingPlaylist && (
        <div className="box mt-5">
          <h3 className="subtitle has-text-centered">Detalles de la Lista de Reproducción</h3>
          <div className="field">
            <label className="label">Nombre de la Lista</label>
            <div className="control">
              <p>{viewingPlaylist.name}</p>
            </div>
          </div>
          <div className="field">
            <label className="label">Canciones</label>
            <div className="control">
              <ul>
                {viewingPlaylist.songs.length > 0 ? (
                  viewingPlaylist.songs.map(songId => {
                    const song = songs.find(s => s.id === songId);
                    return <li key={songId}>{song ? song.title : 'Canción eliminada'}</li>;
                  })
                ) : (
                  <p>No hay canciones en esta lista</p>
                )}
              </ul>
            </div>
          </div>
          <div className="control has-text-centered">
            <button
              className="button is-danger"
              onClick={handleClosePlaylistDetails}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicApp;
