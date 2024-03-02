import "./App.css";
import SpotifyAuth from "./components/InitiateSpotifyAuth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import PrivateRoutes from "./components/PrivateRoutes";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/authorize" element={<SpotifyAuth />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
