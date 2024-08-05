import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const CreateSongPage = () => {
  const [songData, setSongData] = useState({
    title: '',
    year: '',
    album: '',
    song_file: null
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSongData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setSongData(prevData => ({
      ...prevData,
      song_file: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!songData.title.trim()) {
      setError('El título de la canción es obligatorio');
      setIsLoading(false);
      return;
    }

    if (!user || !user.token) {
      setError('No estás autenticado. Por favor, inicia sesión.');
      setIsLoading(false);
      navigate('/login');
      return;
    }

    const formData = new FormData();
    formData.append('title', songData.title);
    if (songData.year) formData.append('year', songData.year);
    if (songData.album) formData.append('album', songData.album);
    if (songData.song_file) formData.append('song_file', songData.song_file);

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
        throw new Error(errorData.detail || 'Error al crear la canción');
      }

      const data = await response.json();
      console.log('Canción creada:', data);
      navigate('/songs');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="hero is-fullheight" style={{
      background: "url('https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMzczODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjI1NTMzMjd8&ixlib=rb-4.0.3&q=80&w=1080') center center",
      backgroundSize: "cover"
    }}>
      <div className="hero-body">
        <div className="container">
          <div className="box">
            <h2 className="title is-2 has-text-centered">Crear Nueva Canción</h2>
            {error && <p className="notification is-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label className="label">Título *</label>
                <div className="control">
                  <input 
                    className="input" 
                    type="text" 
                    name="title" 
                    value={songData.title} 
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Año de lanzamiento</label>
                <div className="control">
                  <input 
                    className="input" 
                    type="number" 
                    name="year" 
                    value={songData.year} 
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Álbum ID</label>
                <div className="control">
                  <input 
                    className="input" 
                    type="number" 
                    name="album" 
                    value={songData.album} 
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Archivo de canción (MP3)</label>
                <div className="control">
                  <input 
                    className="input" 
                    type="file" 
                    name="song_file" 
                    onChange={handleFileChange}
                    accept=".mp3"
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button 
                    className={`button is-primary ${isLoading ? 'is-loading' : ''}`} 
                    type="submit"
                    disabled={isLoading}
                  >
                    Crear Canción
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSongPage;