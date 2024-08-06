import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 

const Home = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login'); 
  };

  return (
    <div className="home-container" onClick={goToLogin}>
      <div className="welcome-message">
        <h1>BIENVENIDOS A MI APLICACIÓN DE MÚSICA</h1>
        <p>Haga clic para iniciar sesión o registrarse</p>
      </div>
    </div>
  );
};

export default Home;