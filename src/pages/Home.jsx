import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
    <div>
        <section className="hero is-fullheight">
        <div className="hero-body" style={{
            background: "url('https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMzczODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjI1NTMzMjd8&ixlib=rb-4.0.3&q=80&w=1080') center center",
            backgroundSize: "cover"
        }}>
            <div className="container has-text-centered">
            <figure className="image is-128x128 is-inline-block">
                <img src="src/assets/Logo.png" alt="Sonirepro logo" />
            </figure>
            <h1 className="title is-1 has-text-white">Sonirepro</h1>
            <nav className="level">
                <div className="level-item has-text-centered">
                <Link to="/login" className="button is-link">Login</Link>
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
            </nav>
            <div className="content has-text-white">
                <h2 className="subtitle is-2" style={{ color: "#ffcc00" }}>Disfruta y comparte música sin límites</h2>
                <p><strong>Sonirepro</strong> es la aplicación definitiva para los amantes de la música. Sube tus canciones, crea playlists personalizadas y comparte tus gustos musicales con amigos. Todo en un solo lugar.</p>
            </div>
            </div>
        </div>
        </section>

        <section className="section">
        <div className="container">
            <div className="columns">
            <div className="column">
                <h2 className="title">Vive la música a tu manera</h2>
                <p>Sube, crea y comparte sin límites</p>
            </div>
            </div>
        </div>
        </section>

        <section className="section">
        <div className="container">
            <div className="columns is-vcentered">
            <div className="column is-half is-vertical-center">
                <div>
                <h2 className="title">Sube tu música</h2>
                <p>Con <strong>Sonirepro</strong>, puedes subir tus propias canciones y tenerlas disponibles en cualquier momento y lugar. Disfruta de tu colección personal de música en la nube.</p>
                </div>
            </div>
            <div className="column is-half">
                <figure className="image is-4by3">
                <img src="https://images.unsplash.com/photo-1493247035880-efdf55d1cc99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMzczODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjI1NTMzMjd8&ixlib=rb-4.0.3&q=80&w=1080" alt="Sube tu música" />
                </figure>
            </div>
            </div>
        </div>
        </section>

        <section className="section">
        <div className="container">
            <div className="columns is-vcentered">
            <div className="column is-half">
                <figure className="image is-4by3">
                <img src="https://images.unsplash.com/photo-1507838153414-b4b713384a76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMzczODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjI1NTMzMjd8&ixlib=rb-4.0.3&q=80&w=1080" alt="Crea playlists personalizadas" />
                </figure>
            </div>
            <div className="column is-half is-vertical-center">
                <div>
                <h2 className="title">Crea playlists personalizadas</h2>
                <p>Organiza tus canciones favoritas en playlists personalizadas. Ya sea para una sesión de ejercicio, un viaje por carretera o simplemente para relajarte, <strong>Sonirepro</strong> tiene todo lo que necesitas.</p>
                </div>
            </div>
            </div>
        </div>
        </section>

        <section className="section">
        <div className="container">
            <div className="columns is-vcentered">
            <div className="column is-half is-vertical-center">
                <div>
                <h2 className="title">Comparte con amigos</h2>
                <p>Comparte tus playlists y descubre las de tus amigos. <strong>Sonirepro</strong> hace que sea fácil compartir tus gustos musicales y encontrar nueva música a través de tus conexiones.</p>
                </div>
            </div>
            <div className="column is-half">
                <figure className="image is-4by3">
                <img src="https://images.unsplash.com/photo-1457463658343-253a25d7dce3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMzczODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjI1NTMzMjd8&ixlib=rb-4.0.3&q=80&w=1080" alt="Comparte con amigos" />
                </figure>
            </div>
            </div>
        </div>
        </section>

        <section className="section">
        <div className="container">
            <blockquote className="blockquote">
            <p className="title">"<strong>Sonirepro</strong> ha transformado completamente mi experiencia musical. Puedo compartir mis playlists favoritas con amigos y descubrir nueva música todo el tiempo."</p>
            <div className="media">
                <figure className="media-left">
                <p className="image is-64x64">
                    <img src="https://storage.googleapis.com/mixo-files/public/img/avatars/male-18.png" alt="Testimonial" />
                </p>
                </figure>
                <div className="media-content">
                <p className="title is-5">Graham Mitchell</p>
                </div>
            </div>
            </blockquote>
        </div>
        </section>

        <footer className="footer">
        <div className="content has-text-centered">
            <p>© All rights reserved.</p>
        </div>
        </footer>
    </div>
    );
};

export default Home;