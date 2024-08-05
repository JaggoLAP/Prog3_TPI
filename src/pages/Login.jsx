// /pages/Login.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log('username: ', username);
  console.log('password: ', password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
      navigate('/Profile');
    } catch (err) {
      setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
    }
  };

  return (
    <section className="hero is-fullheight">
      <div className="hero-body" style={{
        background: "url('https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMzczODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjI1NTMzMjd8&ixlib=rb-4.0.3&q=80&w=1080') center center",
        backgroundSize: "cover"
      }}>
        <div className="container">
          <div className=' has-text-centered'>
            <figure className="image is-64x64 is-inline-block">
              <img src="https://storage.googleapis.com/mixo-files/logos/1722553328822-msica-yc42.svg" alt="Sonirepro logo" />
            </figure>
            <h1 className="title is-1 has-text-white">Sonirepro</h1>
            <p> </p>
          </div>
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
          
          <div className="columns is-centered mt-6">
            <div className="column is-one-third">
              <div className="box">
                <h2 className="title is-3 has-text-centered">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                  <div className="field">
                    <label className="label">Nombre de usuario</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="Ingresa tu nombre de usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Contraseña</label>
                    <div className="control">
                      <input
                        className="input"
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {error && <p className="help is-danger">{error}</p>}

                  <div className="field">
                    <div className="control">
                      <button className="button is-primary is-fullwidth" type="submit">
                        Iniciar Sesión
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;