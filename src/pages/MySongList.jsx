import React, { useState, useEffect } from 'react';
import songService from '../services/songService';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const MySongList = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 12;

  const user = JSON.parse(localStorage.getItem('user__id'));
  const userId = user ? user : null;
  const navigate = useNavigate();

  const handleEdit = (songId) => {
    navigate(`/songs/${songId}`);
  };

  const handleDelete = async (songId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta canción?')) {
      try {
        await songService.deleteSong(songId);
        fetchMySongs(); // Recargar la lista después de eliminar
      } catch (err) {
        setError('Error al eliminar la canción: ' + err.message);
      }
    }
  };

  const fetchMySongs = async (url = null) => {
    try {
      setLoading(true);
      const data = await songService.getAllSongs(url, pageSize, userId);
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
  
  useEffect(() => {
    fetchMySongs();
  }, []);

  if (loading) {
    return <div className="hero is-fullheight is-light">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">Cargando mis canciones...</h1>
        </div>
      </div>
    </div>;
  }

  if (error) {
    return <div className="hero is-fullheight is-danger">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">Error: {error}</h1>
        </div>
      </div>
    </div>;
  }

  return (
    <Layout>
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="box">
              <h1 className="title has-text-centered">Mis Canciones</h1>
              <p className="subtitle has-text-centered">Usuario: { userId }</p>
              <p className="subtitle has-text-centered">Total de mis canciones: {totalCount}</p>
              {songs.length > 0 ? (
                <div className="columns is-multiline">
                  {songs.map((song) => (
                    <div key={song.id} className="column is-one-third">
                      <div className="card">
                        <header className="card-header">
                          <p className="card-header-title">
                            {song.title}
                          </p>
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
                        {song.owner === userId && (
                          <footer className="card-footer">
                            <button 
                              className="button is-small is-info card-footer-item" 
                              onClick={() => handleEdit(song.id)}
                            >
                              Modificar
                            </button>
                            <button 
                              className="button is-small is-danger card-footer-item" 
                              onClick={() => handleDelete(song.id)}
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
                  onClick={() => fetchMySongs(previousPage)} 
                  disabled={!previousPage}
                >
                  Anterior
                </button>
                <button 
                  className="button is-primary" 
                  onClick={() => fetchMySongs(nextPage)} 
                  disabled={!nextPage}
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MySongList;