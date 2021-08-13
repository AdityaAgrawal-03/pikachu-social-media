import React from "react";
import { Routes, Route } from "react-router";
import "./App.css";
import { Home, PrivateRoute } from "./components";
import { SinglePost, Login, Signup } from "./features/index";

function App() {
  return (
    <div className="bg-coolGray-200 min-h-screen">
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <PrivateRoute path="/" element={<Home />} />
        <PrivateRoute path="/post/:postId" element={<SinglePost />} />
      </Routes>
    </div>
  );
}

export default App;
