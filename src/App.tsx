import "./App.css";
import SpotifyAuth from "./components/InitiateSpotifyAuth";
import Admin2 from "./pages/Admin2";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import { useEffect, useState } from "react";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/authorize" element={<SpotifyAuth />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin2" element={<Admin2 />} /> 
        </Routes>
      </Router>
    </>
  );
}

export default App;
