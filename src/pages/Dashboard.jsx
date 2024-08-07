import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import songService from '../services/songService';
import Navdash from '../components/navdash';
import Footer from '../components/footer';
import Tabs from '../components/tabs';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [activeTab, setActiveTab] = useState('Canciones');
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [selectedSongs, setSelectedSongs] = useState(new Set());
  const [newSong, setNewSong] = useState({
    title: '',
    year: '',
    album: '',
    file: null,
  });

  const fetchSongs = async (url = null) => {
    try {
      setLoading(true);
      const data = await songService.getAllSongs(url, 12);
      setSongs(data.results);
      setNextPage(data.next);
      setPreviousPage(data.previous);
      setTotalCount(data.count);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchPlaylists = async () => {
    try {
      const data = await songService.getPlaylists();
      setPlaylists(data.results);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleCreatePlaylist = async () => {
    try {
      await songService.createPlaylist(newPlaylistName);
      setNewPlaylistName('');
      fetchPlaylists(); // Actualiza la lista de listas de reproducción
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSelectSong = (songId) => {
    setSelectedSongs((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(songId)) {
        newSelection.delete(songId);
      } else {
        newSelection.add(songId);
      }
      return newSelection;
    });
  };

  const handleAddSongsToPlaylist = async () => {
    try {
      if (!selectedPlaylist) {
        throw new Error('Selecciona una lista de reproducción.');
      }
      for (const songId of selectedSongs) {
        await songService.addSongToPlaylist(selectedPlaylist, songId);
      }
      setSelectedSongs(new Set());
      fetchPlaylists(); // Actualiza las listas de reproducción
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteSong = async (songId) => {
    try {
      await songService.deleteSong(songId);
      setSongs(prevSongs => prevSongs.filter(song => song.id !== songId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFileChange = (e) => {
    setNewSong({ ...newSong, file: e.target.files[0] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSong({ ...newSong, [name]: value });
  };

  const handleUploadSong = async () => {
    if (!newSong.title || !newSong.year || !newSong.album || !newSong.file) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', newSong.title);
      formData.append('year', newSong.year);
      formData.append('album', newSong.album);
      formData.append('file', newSong.file);

      await songService.uploadSong(formData);
      setNewSong({ title: '', year: '', album: '', file: null });
      fetchSongs(); // Actualiza la lista de canciones
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchSongs();
    fetchPlaylists(); // Carga las listas de reproducción al montar el componente
  }, []);

  if (loading) {
    return (
      <div className="hero is-fullheight is-light">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">Cargando...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hero is-fullheight is-danger">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">Error: {error}</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="hero is-fullheight"
      style={{
        background:
          "url('https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMzczODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjI1NTMzMjd8&ixlib=rb-4.0.3&q=80&w=1080') center center / contain",
      }}
    >
      <Navdash />
      <div className="hero-body">
        <div className="container">
          <div className="box">
            <h1 className="title has-text-centered">Bienvenido, {user?.username}!</h1>
            <p className="subtitle has-text-centered">
              Estamos contentos de verte de nuevo.
            </p>
            <Tabs
              tabs={[
                { label: 'Canciones' },
                { label: 'Listas de Reproducción' },
                { label: 'Subir Canción' },
              ]}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
            <div className="box mt-6">
              {activeTab === 'Canciones' && (
                <>
                  <h2 className="title has-text-centered">Todas las Canciones</h2>
                  <p className="subtitle has-text-centered">Total de canciones: {totalCount}</p>
                  {songs.length > 0 ? (
                    <div className="columns is-multiline">
                      {songs.map((song) => (
                        <div key={song.id} className="column is-one-third">
                          <div className="card">
                            <header className="card-header">
                              <p className="card-header-title">{song.title}</p>
                            </header>
                            <div className="card-content">
                              <div className="content">
                                <p><strong>ID:</strong> {song.id}</p>
                                <p><strong>Año:</strong> {song.year || 'No especificado'}</p>
                                <p><strong>Duración:</strong> {song.duration ? `${song.duration} segundos` : 'No especificada'}</p>
                                <p><strong>Álbum ID:</strong> {song.album || 'No especificado'}</p>
                                {song.song_file && (
                                  <div>
                                    <p><strong>Archivo de canción:</strong></p>
                                    <audio controls className="is-full-width">
                                      <source src={song.song_file} type="audio/mpeg" />
                                      Tu navegador no soporta el elemento de audio.
                                    </audio>
                                  </div>
                                )}
                               
                                <div className="field mt-3">
                                  <div className="control">
                                    <button
                                      className="button is-danger"
                                      onClick={() => handleDeleteSong(song.id)}
                                    >
                                      Eliminar
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="has-text-centered">No hay canciones disponibles</p>
                  )}
                  <div className="buttons is-centered mt-5">
                    <button
                      className="button is-primary"
                      onClick={() => fetchSongs(previousPage)}
                      disabled={!previousPage}
                    >
                      Anterior
                    </button>
                    <button
                      className="button is-primary"
                      onClick={() => fetchSongs(nextPage)}
                      disabled={!nextPage}
                    >
                      Siguiente
                    </button>
                  </div>
                </>
              )}
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
                        onClick={() => handleViewPlaylist(playlist.id)}
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


              {activeTab === 'Subir Canción' && (
                <div className="box">
                  <h2 className="title has-text-centered">Subir Nueva Canción</h2>
                  <div className="field">
                    <label className="label">Título de la Canción</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        name="title"
                        value={newSong.title}
                        onChange={handleInputChange}
                        placeholder="Título de la canción"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Año</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        name="year"
                        value={newSong.year}
                        onChange={handleInputChange}
                        placeholder="Año"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Álbum</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        name="album"
                        value={newSong.album}
                        onChange={handleInputChange}
                        placeholder="Álbum"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Archivo de Música</label>
                    <div className="control">
                      <input
                        className="input"
                        type="file"
                        accept="audio/*"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                  <div className="control has-text-centered">
                    <button
                      className="button is-primary"
                      onClick={handleUploadSong}
                    >
                      Subir Canción
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
