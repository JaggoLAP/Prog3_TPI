import React from 'react';
import { Link } from 'react-router-dom';

const NavIni = () => {
  return (
    <div>
    
    <nav className="level">
    <figure className="image is-128x128 is-inline-block">
                <img src="../public/Logo.png" alt="Sonirepro logo" />
            </figure>
            <h1 className="title is-1 has-text-white">Sonirepro</h1>
      <div className="level-item has-text-centered">
        <Link to="/login" className="button is-link login">Iniciar sesion</Link>
      </div>
    </nav>  
    </div>
  );
};
 
export default NavIni;