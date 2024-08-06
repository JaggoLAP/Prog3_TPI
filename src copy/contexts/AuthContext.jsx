import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

   const login = async (email, password) => {
    if (email && password) {
      setUser({ email });
      navigate('/dashboard');
    }
  };

  const register = async (email, password) => {
    if (email && password) {
      setUser({ email });
      navigate('/dashboard');
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);