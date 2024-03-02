import "./App.css";
import SpotifyAuth from "./components/InitiateSpotifyAuth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import PrivateRoutes from "./components/PrivateRoutes";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />} >
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="/" element={<SpotifyAuth />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
