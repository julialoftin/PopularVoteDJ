import "./App.css";
import SpotifyAuth from "./components/InitiateSpotifyAuth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Redirect from "./pages/Redirect";
import TrackRecommendations from "./pages/TrackRecommendations";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/authorize" element={<SpotifyAuth />} />
          <Route path="/redirect" element={<Redirect />} />
          <Route path="/admin" element={<Admin />} /> 
          <Route path="/track-recommendations/:id" element={<TrackRecommendations />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
