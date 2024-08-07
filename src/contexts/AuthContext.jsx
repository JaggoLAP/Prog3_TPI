// src/contexts/AuthContext.js
import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (username, password) => {
    // Aquí agregarías la lógica de autenticación, como una llamada a una API
    // Simulación de login exitoso
    setUser({ username });
  };

  const logout = () => {
    setUser(null);
    navigate('/'); // Redirigir a la página principal (login) después de cerrar sesión
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
