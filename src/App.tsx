import "./App.css";
import SpotifyAuth from "./components/InitiateSpotifyAuth";
// import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import PrivateRoutes from "./components/PrivateRoutes";
import Home from "./pages/Home";

function App() {
  return (
    <>
      {/* <BrowserRouter> */}
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/authorize" element={<SpotifyAuth />} />
        </Routes>
      </Router>
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
