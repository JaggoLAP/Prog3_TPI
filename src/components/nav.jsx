import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="container">
    <div className=' has-text-centered'>
      <figure className="image is-64x64 is-inline-block">
        <img src="/Logo.png" alt="Sonirepro logo" />
      </figure>
      <h1 className="title is-1 has-text-white">Sonirepro</h1>
      <p> </p>
    </div>
    <nav className="level">
      <div className='level-item has-text-centered'>
        <Link to="/" className='button is-link'>Inicio</Link>
      </div>
      
      <div className="level-item has-text-centered">
        <Link to="/profile" className="button is-link">Perfil de Usuario</Link>
      </div>
     
      <div className="level-item has-text-centered">
        <Link to="/create-song" className="button is-link">Subir canciones</Link>
      </div>
    </nav>  
    </div>
  );
};
 
export default Nav;
