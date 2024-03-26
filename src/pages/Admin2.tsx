import { useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import CreateAPlaylist from "../components/CreateAPlaylist";
import GetUsersSpotifyProfile from "../components/GetUsersSpotifyProfile";
import "../styles/Admin.css"

const Admin2 = () => {
    async function getToken() {
        const codeVerifier = localStorage.getItem("codeVerifier");
        const clientID = import.meta.env.VITE_CLIENT_ID;
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const redirectURI = "http://localhost:5173/admin";
    
        if (codeVerifier != null && code != null) {
          const payload = new URLSearchParams({
            client_id: clientID,
            grant_type: "authorization_code",
            code: code,
            redirect_uri: redirectURI,
            code_verifier: codeVerifier,
          });
    
          try {
            const response = await fetch("https://accounts.spotify.com/api/token", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: payload,
              credentials: "include",
            });
    
            if (!response.ok) {
              console.log(response);
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
    
            window.localStorage.setItem("access_token", data["access_token"]);
            window.localStorage.setItem("refresh_token", data["refresh_token"]);
    
          } catch (error) {
            console.error("Error during token retrieval:", error);
          }
        } else {
          console.log("Code verifier or code not found");
        }
      }
    
      const getRefreshToken = async () => {
        const refreshToken = localStorage.getItem("refresh_token");
        const clientID = import.meta.env.VITE_CLIENT_ID;
    
        if (refreshToken != null) {
          const payload = new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
            client_id: clientID,
          });
    
          try {
            const response = await fetch("https://accounts.spotify.com/api/token", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: payload,
            });
    
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            localStorage.setItem("access_token", data["access_token"]);
            localStorage.setItem("refresh_token", data["refresh_token"]);
          } catch (error) {
            console.error("Error during refresh token retrieval:", error);
          }
        } else {
          console.log("Refresh token not found");
        }
      };
    
      useEffect(() => {
        const handleToken = () => {
          getToken();
        };
        handleToken();
        const handleRefreshingToken = () => {
          getRefreshToken();
        };
        handleRefreshingToken();
      }, []);
    
      setInterval(getRefreshToken, 3540000);
    
      return (
        <>
          <AdminNavbar />
          <GetUsersSpotifyProfile />
          <CreateAPlaylist />
        </>
      );
}

export default Admin2;