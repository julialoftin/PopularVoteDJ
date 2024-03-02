import { useEffect } from "react";

export default function Admin() {
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
    const handleRefreshingToken = () => {
      getRefreshToken();
      console.log(localStorage.getItem("refresh_token"));
    };
    handleRefreshingToken();
  }, []);

  setInterval(getRefreshToken, 3540000);

  return (
    <>
      <p>Does it work</p>
    </>
  );
}
