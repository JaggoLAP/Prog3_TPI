import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import userService from '../services/userService';
import Layout from '../components/Layout';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  const saveUserIdToLocalStorage = (userId) => {
    localStorage.setItem('user__id', userId);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await userService.getProfile();
        setProfile(profileData);
        if (profileData.user__id) {
          saveUserIdToLocalStorage(profileData.user__id);
        }
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
    <Layout>
      <section className="hero is-fullheight">
    
        <div className="box mt-6">
          <h2 className="title is-2 has-text-centered">Perfil de Usuario</h2>
          <div className="content">
            <p><strong>User ID:</strong> {profile.user__id}</p>
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
          </div>
        </div>
          
      </section>
    </Layout>
  );
};

export default Profile;