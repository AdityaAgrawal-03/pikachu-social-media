import React from 'react';
import { Routes, Route } from 'react-router';
import './App.css';
import { Home } from './components/Home';

function App() {
  return (
    <div className="bg-coolGray-200 min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
