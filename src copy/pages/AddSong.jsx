import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addSong } from '../services/api';

const AddSong = () => {
  const [title, setTitle] = useState('');
  const [songFile, setSongFile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title); 
    formData.append('song_file', songFile);

    try {
      await addSong(formData);
      navigate('/songs');
    } catch (err) {
      setError('Error adding song');
    }
  };

  return (
    <div style={{ backgroundColor: 'black', color: 'white', padding: '20px' }}>
      <h1>Add Song</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Song File:</label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setSongFile(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Add Song</button>
      </form>
    </div>
  );
};

export default AddSong;