import React from 'react';
import { Link } from 'react-router-dom';

const NavIniciop = () => {
  return (
 
    <nav className="level">
        <figure className="image is-128x128 is-inline-block">
                <img src="src/assets/Logo.png" alt="Sonirepro logo" />
            </figure>
            <h1 className="title is-1 has-text-white">Sonirepro</h1>
      <div className='level-item has-text-centered'>
        <Link to="/" className='button is-link'>Inicio</Link>
      </div>
      
      <div className="level-item has-text-centered">
        <Link to="/login" className="button is-link">Inicir sesion</Link>
      </div>
     
      
    </nav>  
 
  );
};

export default NavIniciop;
