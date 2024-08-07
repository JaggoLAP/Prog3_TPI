import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/footer';
import NavIni from '../components/NavIni';
const Home = () => {
    return (
    <div>
        <section className="hero is-fullheight">
        <div className='hero-background'>
        <div className="hero-body">
            
            <div className="container has-text-centered">
            
            <NavIni/>
            <div className="content has-text-white">
                <h2 className="subtitle is-2" style={{ color: "#ffcc00" }}>Disfruta y comparte música sin límites</h2>
                <p className='txt-home'><strong>Sonirepro</strong> es la aplicación definitiva para los amantes de la música. Sube tus canciones, crea playlists personalizadas y comparte tus gustos musicales con amigos. Todo en un solo lugar.</p>
                
            </div>
            <div className="level-item has-text-centered">
        <Link to="/songs" className="button is-link">Listado de canciones</Link>
      </div>
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

     <Footer/>
    </div>
    );
};

export default Home;