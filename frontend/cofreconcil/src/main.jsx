import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Home';
import Dashboard from './pages/Fechamento';
import Conferencia from './pages/Conferencia'
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/conferencia" element={<Conferencia />} />
    </Routes>
  </Router>
);

