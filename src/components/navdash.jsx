// src/components/Navdash.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // Asegúrate de importar el AuthContext

const Navdash = () => {
  const { logout } = useContext(AuthContext); // Obtener la función logout del contexto

  return (
    <div className="contenido">
      <div className=' has-text-centered'>
        <figure className="image is-64x64 is-inline-block">
          <img src="https://storage.googleapis.com/mixo-files/logos/1722553328822-msica-yc42.svg" alt="Sonirepro logo" />
        </figure>
        <h1 className="title is-1 has-text-white">Sonirepro</h1>
        <p> </p>
      </div>
      <nav className="level">
        <div className='level-item has-text-centered'>
          <Link to="/Dashboard" className='button is-link'>Principal</Link>
        </div>
        
        <div className="level-item has-text-centered">
          <Link to="/profile" className="button is-link">Perfil de Usuario</Link>
        </div>

        <div className="level-item has-text-centered">
          <button className="button is-danger" onClick={logout}>
            Cerrar Sesión
          </button>
        </div>
      </nav>  
    </div>
  );
};

export default Navdash;
