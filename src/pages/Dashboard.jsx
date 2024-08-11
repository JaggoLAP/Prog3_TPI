import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import songService from '../services/songService';
import userService from '../services/userService';
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

  const [songsMy, setSongsMy] = useState([]);
  const [loadingMy, setLoadingMy] = useState(true);
  const [errorMy, setErrorMy] = useState(null);
  const [nextPageMy, setNextPageMy] = useState(null);
  const [previousPageMy, setPreviousPageMy] = useState(null);
  const [totalCountMySongs, settotalCountMySongs] = useState(0);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [modalData, setModalData] = useState({
    title: '',
    year: '',
    album: '',
  });

  const [newSong, setNewSong] = useState({
    title: '',
    year: '',
    album: '',
    song_file: null,
  });
  const [firstName, setFirstName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = await userService.getProfile();
        if (profileData.user__id) {
          localStorage.setItem('user__id', profileData.user__id);
          setFirstName(profileData.first_name);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserProfile();
  }, []);

  const userId = localStorage.getItem('user__id');
  
  const fetchSongs = async (url = null) => {
    try {
      setLoading(true);
      const data = await songService.getAllSongs(url);
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

  const fetchMySongs = async (url = null) => {
    try {
      setLoadingMy(true);
      const dataMy = await songService.getAllSongs(url, userId);
      setSongsMy(dataMy.results);
      setNextPageMy(dataMy.next);
      setPreviousPageMy(dataMy.previous);
      settotalCountMySongs(dataMy.count);
      setLoadingMy(false);
    } catch (err) {
      setErrorMy(err.message);
      setLoadingMy(false);
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
      fetchPlaylists();
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
      fetchPlaylists();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteSong = async (songId) => {
    setIsLoading(true);
    if (window.confirm('¿Estás seguro de que quieres eliminar esta canción?')) {
      try {
        await songService.deleteSong(songId);
        fetchMySongs();
      } catch (err) {
        setError('Error al eliminar la canción: ' + err.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  const openModal = async (songId) => {
    try {
      const songData = await songService.getSongById(songId);
      setCurrentSong(songData);
      setModalData({
        title: songData.title || '',
        year: songData.year || '',
        album: songData.album || '',
      });
      setIsModalOpen(true);
    } catch (err) {
      setError('Error al obtener los datos de la canción: ' + err.message);
    }
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentSong(null);
  };
  
  const handleInputChangeEdit = (e) => {
    const { name, value } = e.target;
    setModalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleUpdateSong = async () => {
    try {
      await songService.patchSongById(currentSong.id, modalData);
      setIsModalOpen(false);
      fetchMySongs();
    } catch (err) {
      setError('Error al actualizar la canción: ' + err.message);
    }
  };
  

  const handleFileChange = (e) => {
    setNewSong({ ...newSong, song_file: e.target.files[0] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSong({ ...newSong, [name]: value });
  };

  const resetForm = () => {
    setNewSong({
      title: '',
      year: '',
      album: '',
      song_file: null,
    });
  };
  
  const handleUploadSong = async (e) => {
    e.preventDefault(); 
    setIsLoading(true);

    const formData = new FormData();
    formData.append('title', newSong.title);
    if (newSong.year) formData.append('year', newSong.year);
    if (newSong.album) formData.append('album', newSong.album);
    if (newSong.song_file) formData.append('song_file', newSong.song_file);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/harmonyhub/songs/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${user.token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error al crear la canción:', errorData);
        throw new Error(errorData.non_field_errors || 'Error al crear la canción');
      }

    const result = await response.json();
    setNewSong({ title: '', year: '', album: '', song_file: null });
    fetchMySongs();
    setActiveTab('Mis Canciones');
  } catch (err) {
    setError(err.message);
    console.error('Error al crear la canción:', err);
  } finally {
    setIsLoading(false);
  }
  };

  useEffect(() => {
    fetchSongs();
    fetchPlaylists();
  }, []);

  useEffect(() => {
    if (activeTab === 'Canciones') {
      fetchSongs();
    } else if (activeTab === 'Mis Canciones') {
      fetchMySongs();
    }
  }, [activeTab]);  

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
    <div className="hero is-fullheight mt-30" style={{
      background: "url('https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMzczODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjI1NTMzMjd8&ixlib=rb-4.0.3&q=80&w=1080') center center",
      backgroundSize: "cover",
      display:'block'
    }}>

      <Navdash />
      <div className="hero-body">
        <div className="container">
          <div className="box">
            <h1 className="title has-text-centered">Bienvenido, {firstName}!</h1>
            <p className="subtitle has-text-centered">
              Estamos contentos de verte de nuevo.
            </p>
            <Tabs
              tabs={[
                { label: 'Canciones' },
                { label: 'Mis Canciones' },
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

          
            {activeTab === 'Mis Canciones' && (
              <>
                <h2 className="title has-text-centered">Lista de Mis Canciones</h2>
                {/* Listar canciones del usuario */}
                <section className="hero is-fullheight">
                  <div className="hero-body">
                    <div className="contenido">
                      <div className="box">
                        <p className="subtitle has-text-centered">Usuario: { userId }</p>
                        <p className="subtitle has-text-centered">Total de mis canciones: {totalCountMySongs}</p>
                        {isModalOpen && (
                          <div className="modal is-active">
                            <div className="modal-background" onClick={closeModal}></div>
                            <div className="modal-content">
                              <div className="box">
                                <h2 className="title">Editar Canción</h2>
                                <div className="field">
                                  <label className="label">Título</label>
                                  <div className="control">
                                    <input
                                      className="input"
                                      type="text"
                                      name="title"
                                      value={modalData.title}
                                      onChange={handleInputChangeEdit}
                                    />
                                  </div>
                                </div>
                                <div className="field">
                                  <label className="label">Año</label>
                                  <div className="control">
                                    <input
                                      className="input"
                                      type="number"
                                      name="year"
                                      value={modalData.year}
                                      onChange={handleInputChangeEdit}
                                    />
                                  </div>
                                </div>
                                <div className="field">
                                  <label className="label">Álbum</label>
                                  <div className="control">
                                    <input
                                      className="input"
                                      type="number"
                                      name="album"
                                      value={modalData.album}
                                      onChange={handleInputChangeEdit}
                                    />
                                  </div>
                                </div>
                                <div className="buttons is-centered">
                                  <button className="button is-light" onClick={closeModal}>
                                    Cancelar
                                  </button>
                                  <button className="button is-primary" onClick={handleUpdateSong}>
                                    Aceptar
                                  </button>
                                </div>
                              </div>
                            </div>
                            <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
                          </div>
                        )}
                        
                        {songsMy.length > 0 ? (
                          <div className="columns is-multiline">
                            {songsMy.map((songMy) => (
                              <div key={songMy.id} className="column is-one-third">
                                <div className="card">
                                  <header className="card-header">
                                    <p className="card-header-title">
                                      {songMy.title}
                                    </p>
                                  </header>
                                  <div className="card-content">
                                    <div className="content">
                                      <p><strong>ID:</strong> {songMy.id}</p>
                                      <p><strong>Año:</strong> {songMy.year || 'No especificado'}</p>
                                      <p><strong>Duración:</strong> {songMy.duration ? `${songMy.duration} segundos` : 'No especificada'}</p>
                                      <p><strong>Álbum ID:</strong> {songMy.album || 'No especificado'}</p>
                                      {songMy.song_file && (
                                        <div>
                                          <p><strong>Archivo de canción:</strong></p>
                                          <audio controls className="is-full-width">
                                            <source src={songMy.song_file} type="audio/mpeg" />
                                            Tu navegador no soporta el elemento de audio.
                                          </audio>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  {songMy.owner.toString() === userId && (
                                    <footer className="card-footer">
                                      <button 
                                        className="button is-small is-info card-footer-item" 
                                        onClick={() => openModal(songMy.id)}
                                      >
                                        Modificar
                                      </button>
                                      <button 
                                        className={`button is-small is-danger card-footer-item ${isLoading ? 'is-loading' : ''}`} 
                                        onClick={() => handleDeleteSong(songMy.id)}
                                      >
                                        Eliminar
                                      </button>
                                    </footer>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="has-text-centered">No has subido canciones aún</p>
                        )}
                        <div className="buttons is-centered mt-5">
                          <button 
                            className="button is-primary" 
                            onClick={() => fetchMySongs(previousPageMy)} 
                            disabled={!previousPageMy}
                          >
                            Anterior
                          </button>
                          <button 
                            className="button is-primary" 
                            onClick={() => fetchMySongs(nextPageMy)} 
                            disabled={!nextPageMy}
                          >
                            Siguiente
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

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
                <form onSubmit={handleUploadSong} encType="multipart/form-data">
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
                      name="song_file"
                      accept="audio/*"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                <div className="control has-text-centered">
                  <button
                    className={`button is-primary ${isLoading ? 'is-loading' : ''}`}
                    // onClick={handleUploadSong}
                    type="submit"
                    disabled={isLoading}
                  >
                    Subir Canción
                  </button>
                </div>
                </form>
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
