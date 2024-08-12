import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import SongList from '../pages/SongList';
import Dashboard from '../pages/Dashboard';
import MusicApp from '../pages/MusicApp';
import NotFoundPage from '../pages/404';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
     
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route 
        path="/profile" 
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } 
      />
 
      <Route 
        path="/songs" 
        element={
            <SongList />
        } 
      />
      <Route 
        path="/songs/:id" 
        element={
          <PrivateRoute>
            <SongList />
          </PrivateRoute>
        } 
      />
      <Route path="/Music-app" element={<MusicApp />} />

      <Route 
        path="*" 
        element={
            <NotFoundPage />
        } 
      />
      
    </Routes>
  );
};

export default AppRoutes;