// src/pages/Songs.jsx
import React, { useState, useEffect } from 'react';
import { 
  fetchSongs, 
  fetchPlaylists, 
  fetchAlbums, 
  fetchArtists, 
  fetchGenres, 
  fetchPlaylistEntries, 
  fetchSongArtists, 
  fetchSongGenres 
} from '../services/api';
import './Songs.css';

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [playlistEntries, setPlaylistEntries] = useState([]);
  const [songArtists, setSongArtists] = useState([]);
  const [songGenres, setSongGenres] = useState([]);
  const [error, setError] = useState('');
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          songsData, 
          playlistsData, 
          albumsData, 
          artistsData, 
          genresData, 
          playlistEntriesData, 
          songArtistsData, 
          songGenresData
        ] = await Promise.all([
          fetchSongs(),
          fetchPlaylists(),
          fetchAlbums(),
          fetchArtists(),
          fetchGenres(),
          fetchPlaylistEntries(),
          fetchSongArtists(),
          fetchSongGenres()
        ]);

        setSongs(Array.isArray(songsData.results) ? songsData.results : []);
        setPlaylists(Array.isArray(playlistsData.results) ? playlistsData.results : []);
        setAlbums(Array.isArray(albumsData.results) ? albumsData.results : []);
        setArtists(Array.isArray(artistsData.results) ? artistsData.results : []);
        setGenres(Array.isArray(genresData.results) ? genresData.results : []);
        setPlaylistEntries(Array.isArray(playlistEntriesData.results) ? playlistEntriesData.results : []);
        setSongArtists(Array.isArray(songArtistsData.results) ? songArtistsData.results : []);
        setSongGenres(Array.isArray(songGenresData.results) ? songGenresData.results : []);
      } catch (err) {
        console.error(err);
        setError('Error al cargar los datos.');
      }
    };

    fetchData();
  }, []);

  const handleCreateOrEditPlaylist = async () => {
    if (newPlaylistName.trim()) {
      try {
        if (isEditing && selectedPlaylist) {
        } else {
        }
        setShowPlaylistModal(false);
        setNewPlaylistName('');
        setIsEditing(false);
        setSelectedPlaylist(null);
        setPlaylists(await fetchPlaylists());
      } catch (err) {
        console.error('Error al crear/editar la lista de reproducción', err);
      }
    }
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setSelectedPlaylist(null);
    setNewPlaylistName('');
    setShowPlaylistModal(true);
  };

  const openEditModal = (playlist) => {
    setIsEditing(true);
    setSelectedPlaylist(playlist);
    setNewPlaylistName(playlist.name);
    setShowPlaylistModal(true);
  };

  const openDeleteModal = (playlist) => {
  };

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="songs-container">
      <div className="navigation-bar">
        <ul>
          <li>Inicio</li>
          <li>Buscar</li>
          <li>Biblioteca</li>
        </ul>
        <div className="header-buttons">
          <button className="add-song-button">Agregar canciones</button>
          <button className="explore-button">Explorar</button>
          <button onClick={openCreateModal} className="new-playlist-button">+ Nueva Lista</button>
        </div>
      </div>
      <div className="main-content">
        <header className="songs-header">
          <div className="user-info">
            <img src="/path-to-your-user-image.jpg" alt="User" className="user-image" />
            <div className="user-details">
              <p>Nombre Usuario</p>
              <button className="logout-button">Cerrar Sesión</button>
            </div>
          </div>
        </header>
        <div className="songs-list">
          {Array.isArray(songs) && songs.length > 0 ? (
            <table className="songs-table">
              <thead>
                <tr>
                  <th>Canciones</th>
                  <th>Lista de reproducción</th>
                  <th>Álbumes</th>
                  <th>Artistas</th>
                  <th>Géneros</th>
                  <th>Playlist</th>
                  <th>Song Artists</th>
                  <th>Song Genres</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {songs.map((song) => (
                      <div key={song.id}>
                        <audio controls src={song.song_file}></audio>
                        <p>{song.title}</p>
                      </div>
                    ))}
                  </td>
                  <td>
                    {playlists.map((playlist) => (
                      <div key={playlist.id} onClick={() => openEditModal(playlist)}>
                        <p>{playlist.name}</p>
                      </div>
                    ))}
                  </td>
                  <td>
                    {albums.map((album) => (
                      <div key={album.id}>
                        <p>{album.title}</p>
                      </div>
                    ))}
                  </td>
                  <td>
                    {artists.map((artist) => (
                      <div key={artist.id}>
                        <p>{artist.name}</p>
                      </div>
                    ))}
                  </td>
                  <td>
                    {genres.map((genre) => (
                      <div key={genre.id}>
                        <p>{genre.name}</p>
                      </div>
                    ))}
                  </td>
                  <td>
                    {playlistEntries.map((entry) => (
                      <div key={entry.id}>
                        <p>{`Playlist: ${entry.playlist}, Song: ${entry.song}`}</p>
                      </div>
                    ))}
                  </td>
                  <td>
                    {songArtists.map((sa) => (
                      <div key={sa.id}>
                        <p>{`Song: ${sa.song}, Artist: ${sa.artist}`}</p>
                      </div>
                    ))}
                  </td>
                  <td>
                    {songGenres.map((sg) => (
                      <div key={sg.id}>
                        <p>{`Song: ${sg.song}, Genre: ${sg.genre}`}</p>
                      </div>
                    ))}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>No hay canciones disponibles.</p>
          )}
        </div>

        {showPlaylistModal && (
          <div className="modal">
            <h2>{isEditing ? 'Editar Lista de Reproducción' : 'Crear Lista de Reproducción'}</h2>
            <input 
              type="text" 
              value={newPlaylistName} 
              onChange={(e) => setNewPlaylistName(e.target.value)} 
              placeholder="Nombre de lista"
            />
            <button onClick={handleCreateOrEditPlaylist}>
              {isEditing ? 'Guardar Cambio' : 'Crear'}
            </button>
            <button onClick={() => setShowPlaylistModal(false)}>Cancelar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Songs;