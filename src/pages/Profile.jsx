import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import userService from '../services/userService';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await userService.getProfile();
        setProfile(profileData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <div className="notification is-danger">{error}</div>;
  }

  if (!profile) {
    return <div>Cargando perfil...</div>;
  }

  return (
    <section className="hero is-fullheight">
      <div className="hero-body" style={{
        background: "url('https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMzczODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjI1NTMzMjd8&ixlib=rb-4.0.3&q=80&w=1080') center center",
        backgroundSize: "cover"
      }}>
        <div className="container">
          <div className="has-text-centered">
            <figure className="image is-64x64 is-inline-block">
              <img src="https://storage.googleapis.com/mixo-files/logos/1722553328822-msica-yc42.svg" alt="Sonirepro logo" />
            </figure>
            <h1 className="title is-1 has-text-white has-text-centered">Sonirepro</h1>
            <p> </p>
          </div>
          <nav className="level">
            <div className="level-item has-text-centered">
              <Link to="/login" className="button is-link">Login</Link>
            </div>
            <div className="level-item has-text-centered">
              <Link to="/profile" className="button is-link">Perfil de Usuario</Link>
            </div>
            <div className="level-item has-text-centered">
              <Link to="/songs" className="button is-link">Listado de canciones</Link>
            </div>
            <div className="level-item has-text-centered">
              <Link to="/create-song" className="button is-link">Subir canciones</Link>
            </div>
          </nav>
          
          <div className="box mt-6">
            <h2 className="title is-2 has-text-centered">Perfil de Usuario</h2>
            <div className="content">
              <p><strong>Username:</strong> {profile.username}</p>
              <p><strong>Nombre:</strong> {profile.first_name} {profile.last_name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Fecha de nacimiento:</strong> {profile.dob || 'No especificada'}</p>
              <p><strong>Biografía:</strong> {profile.bio || 'No especificada'}</p>
              {profile.image && (
                <figure className="image is-128x128">
                  <img src={profile.image} alt="Imagen de perfil" />
                </figure>
              )}
              <p><strong>Estado:</strong> {profile.state !== null ? profile.state : 'No especificado'}</p>
              <p><strong>Fecha de alta:</strong> {new Date(profile.created_at).toLocaleDateString()}</p>
              <p><strong>Última actualización:</strong> {new Date(profile.updated_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;