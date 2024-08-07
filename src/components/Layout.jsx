import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import authService from '../services/authService';

const userId = localStorage.getItem('user__id');

const Layout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('user__id');
    setIsLoggedIn(!!userId);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="hero is-fullheight">
      <div className="hero-body" style={{
        background: "url('https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMzczODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjI1NTMzMjd8&ixlib=rb-4.0.3&q=80&w=1080') center center",
        backgroundSize: "cover"
      }}>
        <div className="container">
          <div>
            <div className='has-text-centered'>
              <figure className="image is-64x64 is-inline-block">
                <img src="src/assets/Logo.png" alt="Sonirepro logo" />
              </figure>
              <h1 className="title is-1 has-text-white">Sonirepro</h1>
              <p> </p>
            </div>
            <nav className="level">
                <div className="level-item has-text-centered">
                  {isLoggedIn ? (
                    <button onClick={handleLogout} className="button is-danger">Logout</button>
                  ) : (
                    <Link to="/login" className="button is-link">Login</Link>
                  )}
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
                <div className="level-item has-text-centered">
                  <Link to="/my-songs" className="button is-link">Mis canciones</Link>
                </div>
            </nav>
            </div>
          {children}
        </div>
      </div>
      <footer className="footer">
        <div className="content has-text-centered">
            <p>© All rights reserved 2024.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;