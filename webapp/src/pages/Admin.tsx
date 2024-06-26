import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import CreateAPlaylist from "../components/CreateAPlaylist";
import GetUsersSpotifyProfile from "../components/GetUsersSpotifyProfile";
import "../styles/Admin.css";

const Admin = () => {
  const [userId, setUserId] = useState<string>("");
  const getRefreshToken = async () => {
    const refreshToken = sessionStorage.getItem("refresh_token");
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
        sessionStorage.setItem("access_token", data["access_token"]);
        sessionStorage.setItem("refresh_token", data["refresh_token"]);
      } catch (error) {
        console.error("Error during refresh token retrieval:", error);
      }
    } else {
      console.log("Refresh token not found");
    }
  };

  useEffect(() => {
    const handleRefreshingToken = () => {
      getRefreshToken();
    };
    handleRefreshingToken();
  }, []);

  setInterval(getRefreshToken, 3540000);

  return (
    <>
      <AdminNavbar />
      <GetUsersSpotifyProfile setUserId={setUserId} />
      <CreateAPlaylist userId={userId} />
    </>
  );
};

export default Admin;
