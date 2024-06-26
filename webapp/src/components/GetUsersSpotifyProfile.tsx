import { useEffect, useState } from "react";

const GetUsersSpotifyProfile = () => {
  const [displayName, setDisplayName] = useState<string>("");
  const getDisplayName = async (accessToken: string) => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching profile details: ", error);
    }
  };

  useEffect(() => {
    const accessToken = sessionStorage.getItem("access_token");
    if (accessToken) {
      getDisplayName(accessToken).then((data) => {
        setDisplayName(data["display_name"]);
      });
      getDisplayName(accessToken).then((data) => {
        sessionStorage.setItem("userId", data["id"]);
      });
    }
  }, [sessionStorage.getItem("access_token")]);

  return (
    <div className="admin-profile-details-container">
      <h3>Welcome, {displayName}!</h3>
    </div>
  );
};

export default GetUsersSpotifyProfile;
