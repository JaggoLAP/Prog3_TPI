import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import userService from '../services/userService';
import Footer from '../components/footer';
import Navdash from '../components/navdash';

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
        backgroundSize: "cover",
        display:'block'
      }}>
           <Navdash/>
          
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
      <Footer/>
    </section>
  );
};

export default Profile;