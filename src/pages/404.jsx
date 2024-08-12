import React from 'react';
import { Link } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import Navlog from '../components/Navlog';
 
const NotFoundPage = () => {
  return (
    <section className="hero is-fullheight" style={{
        background: "url('https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMzczODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjI1NTMzMjd8&ixlib=rb-4.0.3&q=80&w=1080') center center",
        backgroundSize: "cover",
      }}>
        
        <div className="container has-text-centered" style={{ marginTop: 20 }}>
        <Navlog />
        <div className="hero-body">
            <div className="columns is-centered">
                <div className="column is-10 has-text-centered" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <figure className="image" style={{ marginBottom: '2rem' }}>
                    <img 
                        src="https://github.com/JaggoLAP/Prog3_TPI/blob/0853b8515ceb13baf2178402b5c78a58524740d0/public/404.png" 
                        alt="Imagen de error 404" 
                        style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                    />
                    </figure>
                    <h1 className="title is-1 has-text-danger" style={{ fontWeight: 'bold', fontSize: '6rem', marginBottom: '1.5rem' }}>Uups!</h1>
                    <p className="subtitle is-4 has-text-light" style={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: '1.5rem' }}>¡Vaya! La página que buscas no está disponible.</p>
                    <p className="content has-text-light" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
                    Parece que la página a la que intentas acceder no existe o ha sido eliminada. 
                    Pero no te preocupes, puedes volver a la página principal y seguir disfrutando 
                    de tu música favorita.
                    </p>
                </div>
            </div>
            </div>
        </div>
    </section>
  );
};

export default NotFoundPage;
