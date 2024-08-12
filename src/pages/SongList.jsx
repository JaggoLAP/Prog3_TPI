import React, { useState, useEffect } from 'react';
import songService from '../services/songService';
import { Link } from 'react-router-dom';
import AppRoutes from '../routes/AppRoutes';
import NavIniciop from '../components/naviniciop';
import Footer from '../components/footer';


const SongList = () => {
   

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 12;

  const fetchSongs = async (url = null) => {
    try {
      if (url && url.startsWith('http://')) {
        url = url.replace('http://', 'https://');
      }
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

  
  useEffect(() => {
    fetchSongs();
  }, []);

  if (loading) {
    return <div className="hero is-fullheight is-light">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">Cargando...</h1>
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
   
    <div className="hero is-fullheight" style={{
      background: "url('https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMzczODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjI1NTMzMjd8&ixlib=rb-4.0.3&q=80&w=1080') center center / contain",
    }
    }>
       <NavIniciop/>
      <div className="hero-body">
    
        <div className="container">
          <div className="box">
            <h1 className="title has-text-centered">Lista de Canciones</h1>
            <p className="subtitle has-text-centered">Total de canciones: {totalCount}</p>
            {songs.length > 0 ? (
              <div className="columns is-multiline">
                {songs.map((song, index) => (
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
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default SongList;