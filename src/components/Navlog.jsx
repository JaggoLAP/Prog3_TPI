import React from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link de react-router-dom

const Navlog = () => {
  return (
    <div>
    
    <nav className="level">
    <figure className="image is-128x128 is-inline-block">
                <img src="src/assets/Logo.png" alt="Sonirepro logo" />
            </figure>
            <h1 className="title is-1 has-text-white">Sonirepro</h1>
            <div className='level-item has-text-centered'>
        <Link to="/" className='button is-link btn-log'>Inicio</Link>
      </div>
    </nav>  
    </div>
  );
};

export default Navlog;