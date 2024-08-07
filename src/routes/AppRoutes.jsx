import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import SongList from '../pages/SongList';
import CreateSong from '../pages/CreateSong';
import MySongList from '../pages/MySongList';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
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
      <Route
        path="/create-song"
        element={
          <PrivateRoute>
            <CreateSong />
          </PrivateRoute>
          
        }
      />
      <Route
        path="/my-songs"
        element={
          <MySongList />
        }
      />
    </Routes>
  );
};

export default AppRoutes;