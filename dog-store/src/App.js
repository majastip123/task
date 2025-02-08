import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListDogs from './components/ListDogs.js';
import DogDetails from './components/DogDetails.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListDogs />} />
        <Route path="/breed/:id" element={<DogDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
