import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

import Footer from '../components/footer';
import Navlog from '../components/Navlog';

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
      navigate('/Dashboard');
    } catch (err) {
      setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
    }
  };

  return (
    <section className="hero is-fullheight">
      <div className="hero-body" style={{
        background: "url('https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMzczODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjI1NTMzMjd8&ixlib=rb-4.0.3&q=80&w=1080') center center",
        backgroundSize: "cover",
        display: 'block'
      }}>
       
          <Navlog/>
          
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
     <Footer/>
    </section>
   
  );
};

export default Login;