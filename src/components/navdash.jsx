import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navdash = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="contenido">
      <div className=' has-text-centered'>
        <figure className="image is-64x64 is-inline-block">
          <img src="../public/Logo.png" alt="Sonirepro logo" />
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
