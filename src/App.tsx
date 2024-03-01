import "./App.css";
import SpotifyAuth from "./components/InitiateSpotifyAuth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SpotifyAuth />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
