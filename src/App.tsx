import "./App.css";
import SpotifyAuth from "./components/InitiateSpotifyAuth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import { useState } from "react";

function App() {
  const [isAccessToken, setIsAccessToken] = useState<boolean | null>(null);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SpotifyAuth isAccessToken={isAccessToken} setIsAccessToken={setIsAccessToken} />} />
          {isAccessToken === true && (
          <Route path="/admin" element={<Admin />} />
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
