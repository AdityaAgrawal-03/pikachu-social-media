import React from 'react';
import { Routes, Route } from 'react-router';
import './App.css';
import { Home } from './components/Home';
import { SinglePost, Login, Signup } from "./features/index"

function App() {
  return (
    <div className="bg-coolGray-200 min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:postId" element={<SinglePost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
