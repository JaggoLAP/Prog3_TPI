import React, { useState } from 'react';
import { uploadSong } from '../services/api';
import './UploadSong.css';


const UploadSong = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      await uploadSong({ title, file });
      setSuccess('Song uploaded successfully');
    } catch (err) {
      setError('Error uploading song');
    }
  };

  return (
    <div className="upload-song">
      <h2>Upload Song</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>File</label>
          <input 
            type="file" 
            onChange={(e) => setFile(e.target.files[0])} 
            required 
          />
        </div>
        <button type="submit">Upload</button>
      </form>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
    </div>
  );
};

export default UploadSong;