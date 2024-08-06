import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Songs from '../pages/Songs';
import Login from '../pages/Login';
import Register from '../pages/Register';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/songs" element={<Songs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Navigate to="/songs" />} />
    </Routes>
  );
};

export default AppRoutes;